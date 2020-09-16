"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pipe = Pipe;

function Pipe() {
  this.events = {};
}

Pipe.prototype.emit = function emit(ev) {
  var _this = this;

  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  if (this.events[ev]) {
    this.events[ev].forEach(function (cb) {
      cb.apply(_this, args);
    });
  }
};

Pipe.prototype.regist = function regist(ev, cb) {
  if (!this.events[ev]) this.events[ev] = [];
  this.events[ev].push(cb);
  return this.events[ev].length - 1;
};

Pipe.prototype.cancel = function cancel(ev, index) {
  if (this.events[ev][index] && this.events.length > index) {
    this.events[ev][index] = null;
  }
};