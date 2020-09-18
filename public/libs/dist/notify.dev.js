"use strict";

var _utils = require("../js/utils/utils.js");

var _view = _interopRequireDefault(require("./view/view.js"));

var _drag = require("../js/utils/drag.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Notify(options) {
  if (!this instanceof Notify) {
    return new Notify(options);
  }

  _view["default"].call(this, options);

  this.hooks.beforeMount = options.beforeMount;
  this.hooks.mounted = options.mounted;
}

var proto = Notify.prototype = Object.create(_view["default"].prototype);
proto.constructor = Notify;

proto.destroy = function () {
  var _this = this;

  this.el.classList.add("notify-leave");
  setTimeout(function () {
    _this.el.parentNode.removeChild(_this.el);
  }, 300);
};

(function (window) {
  _utils.utils.assert(_utils.utils.isWindow(window) && _typeof(window.document) === "object", "notify need a window with document"); // let notify = Object.create(null);


  var notifyConfig = {
    template: "\n            <div class=\"msg\">\n                __slot__\n            </div>\n        ",
    type: "success",
    name: "notify",
    slot: {
      "default": "<div>notify</div>"
    },
    renderType: "append",
    msg: ""
  };

  Notify.success = function (msg) {
    var note = new Notify(Object.assign(notifyConfig, {
      type: "success",
      slot: {
        "default": "<div class=\"notify\">\n                <span class=\"sign success\"></span>\n                <span class=\"msg\">".concat(msg, "</span>\n                <a href=\"javascript:;\" class=\"close-notify\">\n                    <span class=\"iconfont icon-cuowu\"></span>\n                </a>\n                </div>")
      },
      beforeMount: function beforeMount() {
        var _this2 = this;

        console.log("beforeMount");
        setTimeout(function () {
          _this2.destroy();
        }, 3000);
      },
      mounted: function mounted() {
        console.log(this.el.firstElementChild);
        this.el.firstElementChild.querySelector(".close-notify").addEventListener("click", this.destroy.bind(this), false);
      },
      msg: msg
    })).mount(".notify-list"); // new Drag(note.el, {
    //     limitYT: 2,
    //     limitYB: 2
    // });
  };

  Notify.warn = function (msg) {
    return new Notify(Object.assign(notifyConfig, {
      type: "warn",
      slot: {
        "default": "<div class=\"notify\">\n                <span class=\"sign warn\"></span>\n                <span class=\"msg\">".concat(msg, "</span>\n                <a href=\"javascript:;\" class=\"close-notify\">\n                    <span class=\"iconfont icon-cuowu\"></span>\n                </a>\n                </div>")
      },
      beforeMount: function beforeMount() {
        console.log("beforeMount");
      },
      mounted: function mounted() {
        console.log("mounted");
      },
      msg: msg
    })).mount(".notify-list");
  };

  Notify.info = function (msg) {
    return new Notify(Object.assign(notifyConfig, {
      type: "info",
      slot: {
        "default": "<div class=\"notify\">\n                <span class=\"sign info\"></span>\n                <span class=\"msg\">".concat(msg, "</span>\n                <a href=\"javascript:;\" class=\"close-notify\">\n                    <span class=\"iconfont icon-cuowu\"></span>\n                </a>\n                </div>")
      },
      beforeMount: function beforeMount() {
        console.log("beforeMount");
        document.createElement("a").addEventListener;
      },
      mounted: function mounted() {},
      msg: msg
    })).mount(".notify-list");
  };

  Notify.danger = function (msg) {
    return new Notify(Object.assign(notifyConfig, {
      type: "danger",
      slot: {
        "default": "<div class=\"notify\">\n                <span class=\"sign danger\"></span>\n                <span class=\"msg\">".concat(msg, "</span>\n                <a href=\"javascript:;\" class=\"close-notify\">\n                    <span class=\"iconfont icon-cuowu\"></span>\n                </a>\n                </div>")
      },
      beforeMount: function beforeMount() {
        console.log("beforeMount");
      },
      mounted: function mounted() {
        console.log("mounted");
      },
      msg: msg
    })).mount(".notify-list");
  };

  window.notify = Notify;
})(window);