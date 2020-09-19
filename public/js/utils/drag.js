export function Drag(el, options = {}) {
    if (!this instanceof Drag) {
        return new Drag(el);
    }
    if (!el) throw new Error("Drag 构造函数需要传入指定元素");
    el = typeof el === "string" ? document.querySelector(el) : el;
    this.init(el, options);
    this.dragable();
}

Drag.prototype.init = function(el, options) {

    // 初始化Drag对象属性 

    this.el = el;

    this.once = options.once;

    this.snap = options.snap || true;

    this.snapX = options.snapX || "0.25rem";

    this.currX = this.el.offsetLeft;

    this.limitYT = parseInt(options.limitYT) * window.outerHeight / 100;

    this.limitYB = parseInt(options.limitYB) * window.outerHeight / 100;

    this.currY = this.el.offsetTop;

    this.windowWidth = window.outerWidth;

    // 修改el属性

    this.el.style.position = 'absolute';

    this.el.style.left = this.currX + 'px';

    this.el.style.top = this.currY + 'px';

    this.el.style.right = "unset";

    this.el.style.bottom = "unset";
}

Drag.prototype.dragable = function() {
    this.handleS = handleTouchStart.bind(this);
    this.handleM = handleTouchMove.bind(this);
    this.handleE = handleTouchEnd.bind(this);
    this.el.addEventListener('touchstart', this.handleS, false);
}

Drag.prototype.destroy = function() {
    this.el.removeEventListener('touchstart', this.handleS, false);
    document.removeEventListener('touchmove', this.handleM, false);
    document.removeEventListener('touchend', this.handleE, false);
    this.el = null;
}

function handleTouchStart(ev) {
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    this.el.style.transition = "";
    let touch = ev.changedTouches[0];
    this.gapX = touch.clientX - this.currX;
    this.gapY = touch.clientY - this.currY;
    document.addEventListener('touchmove', this.handleM, false);
    document.addEventListener('touchend', this.handleE, false);
}

function handleTouchMove(ev) {
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    ev.preventDefault();
    ev.cancelBubble = true;
    let touch = ev.changedTouches[0];
    let changedX = (touch.clientX - this.gapX) + 'px';
    let changedY = (touch.clientY - this.gapY) + 'px';
    if (parseFloat(changedX) + (parseFloat(changedY) > 6)) {
        this.el.style.left = changedX;
        this.el.style.top = changedY;
    }
    return false;
}

function handleTouchEnd(ev) {
    ev.stopPropagation();
    ev.stopImmediatePropagation();
    let touch = ev.changedTouches[0];
    if (this.snap) {
        if (touch.clientX > this.windowWidth / 2) {
            move({
                type: 'left',
                el: this.el,
                location: (window.outerWidth * ((100 - this.snapX) / 100) - this.el.offsetWidth),
                time: 200
            });
            this.el.style.left = "unset";
        } else {
            move({
                type: 'left',
                el: this.el,
                location: (window.outerWidth * (this.snapX / 100)),
                time: 200
            });
            this.el.style.right = "unset";
        }
    }
    if (this.limitYT || this.limitYB) {
        if (this.limitYT > this.el.offsetTop) {
            // this.el.style.top = this.limitYT + 'px';
            move({
                type: 'top',
                el: this.el,
                location: this.limitYT,
                time: 200
            });
        } else if (window.outerHeight - this.limitYB < this.el.offsetTop) {
            // this.el.style.top = window.outerHeight - this.limitYB + 'px';
            move({
                type: 'top',
                el: this.el,
                location: window.outerHeight - this.limitYB,
                time: 200
            });
        }
    }
    document.removeEventListener('touchmove', this.handleM, false);
    document.removeEventListener('touchend', this.handleE, false);
    setTimeout(() => {
        this.currX = this.el.offsetLeft;
        this.currY = this.el.offsetTop;
        this.once && this.destroy();
    }, 500)
}


function move(options) {
    let { type, location, time, el } = options;
    let now = parseFloat(getComputedStyle(el).getPropertyValue(type));
    if (String(location).endsWith("rem")) {
        location = parseFloat(location) * 100;
    }

    let distance = location - now,
        symbol;
    if (distance > 0) {
        symbol = true;
    } else {
        distance = -distance;
        symbol = false;
    }
    let frame = distance / time;
    let start;

    function step(timestamp) {
        if (start === undefined)
            start = timestamp;
        const elapsed = timestamp - start;

        // `Math.min()` is used here to make sure that the element stops at exactly 200px.
        // console.log(now - (frame * elapsed))
        if (symbol) {
            el.style[type] = now + (frame * elapsed) + 'px';
        } else {
            // console.log(now - (frame * elapsed))
            el.style[type] = (now - (frame * elapsed)) + 'px';
        }
        // 'translateX(' + Math.min(0.1 * elapsed, 200) + 'px)';

        if (elapsed < time) { // Stop the animation after 2 seconds
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
}