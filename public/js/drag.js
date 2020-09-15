export function Drag(el) {
    if (!this instanceof Drag) {
        return new Drag(el);
    }
    if (!el) throw new Error("Drag 构造函数需要传入指定元素");
    el = typeof el === "string" ? document.querySelector(el) : el;
    this.init(el);
    this.dragable();
}


Drag.prototype.init = function(el) {
    el.style.position = 'absolute';
    this.el = el;
    this.currX = this.el.offsetLeft;
    this.currY = this.el.offsetTop;
    console.log(this.currX, this.currY);
    this.el.style.left = this.currX + 'px';
    this.el.style.top = this.currY + 'px';
    this.el.style.right = "unset";
    this.el.style.bottom = "unset";
    this.windowWidth = window.outerWidth;
}

Drag.prototype.dragable = function() {
    this.el.addEventListener('touchstart', handleTouchStart.bind(this), false);
    this.el.addEventListener('touchmove', handleTouchMove.bind(this), false);
    this.el.addEventListener('touchend', handleTouchEnd.bind(this), false);
}

function handleTouchStart(ev) {
    let touch = ev.changedTouches[0];
    this.gapX = touch.clientX - this.currX;
    this.gapY = touch.clientY - this.currY;
}

function handleTouchMove(ev) {
    ev.stopPropagation();
    // console.log(ev)
    let touch = ev.changedTouches[0];
    let changedX = (touch.clientX - this.gapX) + 'px';
    let changedY = (touch.clientY - this.gapY) + 'px';
    this.el.style.left = changedX;
    this.el.style.top = changedY;
}

function handleTouchEnd(ev) {
    let touch = ev.changedTouches[0];
    if (touch.clientX > this.windowWidth / 2) {
        this.el.style.right = ".25rem";
        this.el.style.left = "unset";
    } else {
        this.el.style.left = ".25rem";
        this.el.style.right = "unset";
    }
    this.currX = this.el.offsetLeft;
    this.currY = this.el.offsetTop;
}