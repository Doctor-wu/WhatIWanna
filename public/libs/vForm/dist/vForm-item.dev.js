"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VFormItem = VFormItem;

var _utils = require("../../js/utils/utils.js");

var _vForm = require("./vForm.js");

function VFormItem() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!this instanceof VFormItem) {
    return new VFormItem(options);
  }

  this.init(options);
}

var itemId = 0;
/**
 * t
 * @author Doctorwu
 * @date 2020-09-15
 * @param options
 *  tag
 *  type
 *  rules
 *  label
 * @returns {VFormItem}
 */

VFormItem.prototype.init = function (options) {
  // utils.assert(options.tag, "VFormItem need a tag");
  Object.assign(this, {
    type: "text",
    rules: []
  }, options);
  this.options = options;
  this.initEL();
};

VFormItem.prototype.initEL = function () {
  this.id = itemId++;
  this.el = document.createElement("div");
  this.el.className = "vform-item";
  var label = document.createElement("label");
  label.className = "vform-item-label";
  label.setAttribute("for", "item".concat(this.id));
  label.style = "display: block;width: 100%;";
  label.innerText = this.label;
  var control = document.createElement(this.tag);
  control.className = "vform-item-control";
  control.id = "item".concat(this.id);
  control.setAttribute("required", true);
  Object.assign(control, this.options.attrs || {});
  control.setAttribute("style", parseStyle(this.options.style));
  console.log(control);
  var msgBox = document.createElement("div");
  msgBox.className = "vform-item-msgbox"; // msgBox.innerText = "测试数据"

  this.el.appendChild(label);
  this.el.appendChild(control);
  this.el.appendChild(msgBox);
};

VFormItem.prototype.mount = function (form) {
  _utils.utils.assert(form instanceof _vForm.VForm, "VFormItem need mount to VForm");

  form.el.appendChild(this.el);
};

function parseStyle(style) {
  if (!style) return "";
  var result = "";
  Object.keys(style).forEach(function (prop) {
    result += "".concat(prop, ":").concat(style[prop], ";");
  });
  return result;
}