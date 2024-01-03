<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { getRandom } from '@/utils/random'
type ListItem = {
    label: string,
    value: string
}
interface Props {
    list: ListItem[]
}
const props = defineProps<Props>();

let viewWidth: number;
let viewHeight: number;
let animations = new WeakMap<HTMLElement, number>();

const initViewSize = () => {
    viewWidth = document.body.clientWidth;
    viewHeight = document.body.clientHeight;
}

// 先给每一个元素初始化一个位置
const initElPos = (el: HTMLElement) => {
    const left = getRandom(0, viewWidth);
    const top = getRandom(0, viewHeight);
    el.style.left = left + 'px';
    el.style.top = top + 'px';
}

const isTabMovable = new WeakMap();
const start = () => {
    const tabs = document.querySelectorAll('.nav-list') as NodeListOf<HTMLElement>;
    for (const tab of tabs) {
        initElPos(tab);
        isTabMovable.set(tab, true);
        moveEl(tab);
        tab.addEventListener('mousedown', dragTab);
    }
}

const move = (el: HTMLElement, sX: number, sY: number) => {
    if (isTabMovable.get(el)) {
        const { width, height } = el.getBoundingClientRect();
        const cX = parseFloat(el.style.left);
        const cY = parseFloat(el.style.top);
        let nX = cX + sX;
        let nY = cY + sY;
        if (nX <= 0) {
            nX = 0;
            sX *= -1;
        }
        if (nX + width >= viewWidth) {
            nX = viewWidth - width;
            sX *= -1;
        }
        if (nY < 0) {
            nY = 0;
            sY *= -1;
        }
        if (nY + height >= viewHeight) {
            nY = viewHeight - height;
            sY *= -1;
        }
        el.style.top = `${nY}px`;
        el.style.left = `${nX}px`
    }
    animations.set(el, requestAnimationFrame(() => { move(el, sX, sY) }));
}

const moveEl = (el: HTMLElement) => {
    let sX = getRandom(0.1, 2);
    let sY = getRandom(0.1, 2);
    move(el, sX, sY);
}

const stop = (e: MouseEvent) => {
    isTabMovable.set(e.target as HTMLElement, false)
}

const continueMove = (e: MouseEvent) => {
    isTabMovable.set(e.target as HTMLElement, true)
}

// 鼠标拖动元素
const dragTab = (e: MouseEvent) => {
    const el = e.target as HTMLElement;
    const mouseClickX = e.x;
    const mouseClickY = e.y;
    const { top, left } = el.getBoundingClientRect();
    const mouse2elx = mouseClickX - left;
    const mouse2ely = mouseClickY - top;
    const zIndex = el.style.zIndex;
    el.style.zIndex = '1000';
    const handleDrag = (e: MouseEvent) => {
        const x = e.x;
        const y = e.y;
        el.style.top = y - mouse2ely + 'px';
        el.style.left = x - mouse2elx + 'px';
    }
    const edgeBar = document.querySelectorAll('.nav-edgebar');
    edgeBar.forEach(el => el.classList.add('show'));

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('mouseup', () => {
        document.removeEventListener('mousemove', handleDrag);
        el.style.zIndex = zIndex;
        edgeBar.forEach(bar => bar.classList.remove('show'));
    })
}

const cancleAllAnimation = () => {
    for (const index of Object.keys(animations)) {
        cancelAnimationFrame(+index);
    }
}

onMounted(() => {
    initViewSize();
    start();
})
onUnmounted(() => {
    cancleAllAnimation()
})

</script>
<template>
    <div class="nav-container">
        <div class="nav-list" v-for="item in props.list" @mouseover="stop" @mouseleave="continueMove">
            <span class="nav-list-item">
                {{ item.label }}
            </span>
        </div>
        <div class="nav-edgebar left">拖到此处固定</div>
        <div class="nav-edgebar right">拖到此处固定</div>
    </div>
</template>

<style scoped>
.nav-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    .nav-list {
        position: fixed;
        aspect-ratio: 1;
        border-radius: 50%;
        border: 1px solid #eee;
        box-shadow: 0 2px 5px #abc;
        padding: 5px;
        top: 0;
        left: 0;
        cursor: pointer;
        user-select: none;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        will-change: top, left;

        span {
            pointer-events: none;
        }
    }

    .nav-edgebar {
        position: absolute;
        height: 100vh;
        width: 40px;
        top: 0;
        writing-mode: vertical-lr;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #eee;
        transition: all 1s;
    }

    .left {
        left: 0;
        border-radius: 0 5px 5px 0;
        transform: translateX(-100%);
    }

    .right {
        right: 0;
        border-radius: 5px 0 0 5px;
        transform: translateX(100%);
    }

    .show {
        transform: translateX(0);
    }
}
</style>