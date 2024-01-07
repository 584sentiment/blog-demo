import { getRandom } from "./random"
export default class DragModel {
    x: number = 0
    y: number = 0
    xDis: number = 0
    yDis: number = 0
    isMoving: boolean = false
    constructor() {
        this.init();
    }
    _mouseDownHandler(e: MouseEvent) {
        this.x = e.pageX;
        this.y = e.pageY;
        this.xDis = 0;
        this.yDis = 0;
        this.isMoving = true;
    }
    _mouseMoveHandler(e: MouseEvent) {
        if(!this.isMoving) return;
        this.xDis = e.pageX - this.x;
        this.yDis = e.pageY - this.y;
        console.log(`movex:${this.xDis} y:${this.yDis}`)
    }
    _mouseUpHandler(e: MouseEvent) {
        this.x = 0;
        this.y = 0;
        this.xDis = 0;
        this.yDis = 0;
        this.isMoving = false;
    }
    init() {
        document.addEventListener('mousedown', this._mouseDownHandler);
        document.addEventListener('mousemove', this._mouseMoveHandler);
        document.addEventListener('mouseup', this._mouseUpHandler);
    }
}

// 初始化位置和移动速度、
export class NodePos {
    x: number
    y: number
    speedX: number
    speedY: number
    vw: number
    vh: number
    id: number = -1
    isMoving: boolean = false

    constructor(vw: number, vh: number) {
        this.vw = vw;
        this.vh = vh;
        this.x = getRandom(0, vw);
        this.y = getRandom(0, vh);
        this.speedX = getRandom(0.1, 2);
        this.speedY = getRandom(0.1, 2);
        this._move();
    }
    
    _move() {
        if (!this.isMoving) return;
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x <= 0) {
            this.x = 0;
            this.speedX *= -1;
        }
        if (this.x >= this.vw) {
            this.x = this.vw;
            this.speedX *= -1;
        }
        if (this.y <= 0) {
            this.y = 0;
            this.speedY *= -1;
        }
        if (this.y >= 0) {
            this.y = this.vh;
            this.speedY *= -1;
        }
        this.id = requestAnimationFrame(this.move)
    }

    stop() {
        this.isMoving = false;
    }

    move() {
        this.isMoving = true;
    }

    cancelAnimation() {
        cancelAnimationFrame(this.id as number);
    }
}