<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import DragModel, {NodePos, Nodes} from '@/utils/DragModel';

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

const initViewSize = () => {
    viewWidth = document.body.clientWidth;
    viewHeight = document.body.clientHeight;
}

const nodes = new Nodes();

const start = () => {
    const tabs = document.querySelectorAll('.nav-list') as NodeListOf<HTMLElement>;
    for (const tab of tabs) {
        const {width, height} = tab.getBoundingClientRect();
        const np = new NodePos(viewWidth, viewHeight, width, height);
        new DragModel(tab, np);
        nodes.add(tab, np);
    }
    nodes.play();
}

onMounted(() => {
    initViewSize();
    start();
})
onUnmounted(() => {
    // cancleAllAnimation()
})

</script>
<template>
    <div class="nav-container">
        <div class="nav-list" v-for="item in props.list">
            <span class="nav-list-item">
                {{ item.label }}
            </span>
        </div>
        <div class="nav-edgebar left">拖到此处固定</div>
        <div class="nav-edgebar right">拖到此处固定</div>
    </div>
</template>

<style scoped>
@keyframes rotateWave {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
.nav-container {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;

    .nav-list {
        position: fixed;
        aspect-ratio: 1;
        border-radius: 42% 38% 63% 49% / 45%;
        background-color: #20ff41;
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
        animation: rotateWave 2s linear infinite;
        filter: contrast(20);

        &::after {
            content: '';
            display: block;
            width: 94%;
            height: 94%;
            border-radius: 50%;
            position: absolute;
            top: 0%;
            left: 0%;
            
            filter: blur(10px) contrast(20);
        }

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