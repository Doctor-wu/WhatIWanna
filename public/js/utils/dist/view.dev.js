"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = View;

var _utils = require("./utils.js");

function View(options) {
  if (!this instanceof View) {
    return new View(options);
  }

  this.options = options;
  this.init();
  this.parseTemplate();
}

var proto = View.prototype;

proto.init = function () {
  _utils.utils.assert(this.options.template, "View needs a template");

  _utils.utils.assert(this.options.name, "View needs a name");

  this.name = this.options.name;
  this.template = this.options.template;
  this.components = this.options.components || [];
};

proto.parseTemplate = function () {
  var _this = this;

  this.template = this.components.forEach(function (component) {
    var name = "__".concat(component.name, "__");
    _this.template = _this.template.replace(new RegExp(name, "g"), component.template);
  });
};