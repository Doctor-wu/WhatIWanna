export function Pipe() {
    this.events = {};
}

Pipe.prototype.emit = function emit(ev, ...args) {
    if (this.events[ev]) {
        this.events[ev].forEach(cb => {
            cb.apply(this, args);
        })
    }
}

Pipe.prototype.regist = function regist(ev, cb) {
    if (!this.events[ev]) this.events[ev] = [];
    this.events[ev].push(cb);
    return this.events[ev].length - 1;
}

Pipe.prototype.cancel = function cancel(ev, index) {
    if (this.events[ev][index] && this.events.length > index) {
        this.events[ev][index] = null;
    }
}