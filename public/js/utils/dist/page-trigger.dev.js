"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Trigger = Trigger;

function Trigger() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.options = options;
  this.init();
  watchHash.call(this);
  console.log(this);
}

Trigger.prototype.init = function () {
  this.pages = this.options.pages || [];
  this.matcher = matcher(this.pages);
};

function matcher(pages) {
  function match(hash) {}

  return {
    match: match
  };
}

function watchHash() {
  var _this = this;

  window.addEventListener("hashchange", function (ev) {
    console.log(ev, _this);
  });
}