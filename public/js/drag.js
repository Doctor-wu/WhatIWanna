export function Drag(el) {
    if (!this instanceof Drag) {
        return new Drag(el);
    }
    if (!el) throw new Error("Drag 构造函数需要传入指定元素");
    el = typeof el === "string" ? document.querySelector(el) : el;
    this.init(el);
    this.dragable(el);
}


Drag.prototype.init = function(el) {
    el.style.position = 'absolute';
}