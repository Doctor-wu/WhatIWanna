"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VForm = VForm;

var _vFormItem = require("./vForm-item.js");

var _utils = require("../../js/utils/utils.js");

function VForm() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!this instanceof VForm) {
    return new VForm(options);
  }

  this.init(options);
  this.loadItem();
}

VForm.prototype.init = function (options) {
  this.el = options.el || document.createElement("form");
  this.el.className = "vform";
  this.items = options.items || [];
  this.title = options.title;
};

VForm.prototype.loadItem = function () {
  var _this = this;

  this.items.forEach(function (item) {
    if (item instanceof _vFormItem.VFormItem) new _vFormItem.VFormItem(item.options).mount(_this);else new _vFormItem.VFormItem(item).mount(_this);
  });
};

VForm.prototype.validate = function () {
  if (this.items.length === 0) return {
    state: 'success',
    info: []
  };
  var arr = [];
  this.items.formEach(function (item) {
    arr.push(item.validate());
  });
  var success = arr.all(function (item) {
    item.state = "success";
  });
  return success ? {
    state: 'success',
    info: arr
  } : {
    state: 'failed',
    info: arr
  };
};

VForm.prototype.mount = function (el) {
  if (!el) throw new Error("el is required in VForm");
  el = typeof el === "string" ? document.querySelector(el) : el;
  el.parentNode.insertBefore(this.el, el);
  el.parentNode.removeChild(el);
};