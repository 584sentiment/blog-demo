import { getRandom } from "./random"

// 记录鼠标点击点和鼠标移动的距离
export default class DragModel {
    x: number = 0
    y: number = 0
    xDis: number = 0
    yDis: number = 0
    isMouseMoving: boolean = false
    isNodeMoving: boolean = true
    el: HTMLElement
    ns: NodePos
    constructor(el: HTMLElement, vw: number, vh: number) {
        this.el = el;
        const {width, height} = el.getBoundingClientRect();
        this.ns = new NodePos(vw, vh, width, height);
        this.init();
    }
    _mouseDownHandler(e: MouseEvent) {
        document.addEventListener('mousemove', this._mouseMoveHandler);
        this.x = e.pageX;
        this.y = e.pageY;
        this.xDis = 0;
        this.yDis = 0;
        this.isMouseMoving = true;
    }
    _mouseMoveHandler(e: MouseEvent) {
        if (!this.isMouseMoving) return;
        this.xDis = e.pageX - this.x;
        this.yDis = e.pageY - this.y;
        console.log(`movex:${this.xDis} y:${this.yDis}`)
    }
    _mouseUpHandler(e: MouseEvent) {
        // this.el.removeEventListener('mousedown', this._mouseDownHandler);
        // this.el.removeEventListener('mousedown', this._mouseDownHandler);
        document.removeEventListener('mousemove', this._mouseMoveHandler);
        document.removeEventListener('mouseup', this._mouseUpHandler);
        this.x = 0;
        this.y = 0;
        this.xDis = 0;
        this.yDis = 0;
        this.isMouseMoving = false;
    }

    stopNodeMoving() {
        this.isNodeMoving = false;
    }

    startNodeMoveing() {
        this.isNodeMoving = true;
    }

    _move() {
        if (this.isNodeMoving) {
            // this.el.style.transform = `translate(${this.ns.x}px ${this.ns.y}px 0)`;
            this.ns.update();
            this.el.style.left = `${this.ns.x}px`;
            this.el.style.top = `${this.ns.y}px`;
        }
        requestAnimationFrame(() => this._move());
    }

    init() {
        this._move();
        this.el.addEventListener('mousedown', this._mouseDownHandler);
        this.el.addEventListener('mouseover', () => this.stopNodeMoving());
        this.el.addEventListener('mouseleave', () => this.startNodeMoveing());
        document.addEventListener('mouseup', this._mouseUpHandler);
    }
}

// 初始化位置和移动速度、更改位置并保证位置合法性
export class NodePos {
    x: number
    y: number
    speedX: number
    speedY: number
    vw: number
    vh: number
    width: number
    height: number

    constructor(vw: number, vh: number, width: number, height: number) {
        this.vw = vw;
        this.vh = vh;
        this.x = getRandom(0, vw);
        this.y = getRandom(0, vh);
        this.speedX = getRandom(0.1, 2);
        this.speedY = getRandom(0.1, 2);
        this.width = width;
        this.height = height;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x <= 0) {
            this.x = 0;
            this.speedX *= -1;
        }
        if (this.x >= this.vw - this.width) {
            this.x = this.vw - this.width;
            this.speedX *= -1;
        }
        if (this.y <= 0) {
            this.y = 0;
            this.speedY *= -1;
        }
        if (this.y >= this.vh - this.height) {
            this.y = this.vh - this.height;
            this.speedY *= -1;
        }
    }
}