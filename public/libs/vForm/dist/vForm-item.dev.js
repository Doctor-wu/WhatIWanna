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
  this.valid = null;
  this.initEL();
  this.observe();
};

VFormItem.prototype.initEL = function () {
  this.id = itemId++;
  this.el = document.createElement("div");
  this.el.className = "vform-item";
  this.el.type = this.type;
  this.el.style = this.style;
  var label;

  if (this.label) {
    label = document.createElement("label");
    label.className = "vform-item-label";
    label.setAttribute("for", "item".concat(this.id));
    label.style = "display: block;width: 100%;";
    label.innerText = this.label;
  }

  var control = document.createElement(this.tag);
  control.className = "vform-item-control";
  control.id = "item".concat(this.id);
  control.setAttribute("required", true);
  Object.assign(control, this.options.attrs || {});
  control.setAttribute("style", parseStyle(this.options.style));
  this.control = control;
  var msgBox = document.createElement("div");
  msgBox.className = "vform-item-msgbox";
  this.msgBox = msgBox; // msgBox.innerText = "测试数据"

  label && this.el.appendChild(label);
  this.el.appendChild(control);
  this.el.appendChild(msgBox);
};

VFormItem.prototype.mount = function (form) {
  _utils.utils.assert(form instanceof _vForm.VForm, "VFormItem need mount to VForm");

  form.el.appendChild(this.el);
  this.initRules();
  return this;
};

VFormItem.prototype.validate = function () {
  var _this = this;

  if (this.valid) return this.valid;
  this.rules.map(function (rule) {
    return resolveRule(rule).call(_this);
  }).forEach(function (item) {
    if (!item.valid) {
      _this.rejectValid(item.msg);
    }
  });
  return this.valid;
};

VFormItem.prototype.initRules = function () {
  var _this2 = this;

  this.rules.forEach(function (item) {
    var validFunc = resolveRule.call(_this2, item);

    _this2.control.addEventListener(item.trigger || "blur", function () {
      var result = validFunc.call(_this2);

      if (!result.valid) {
        console.log(result);

        _this2.rejectValid(result.msg);
      } else {
        _this2.resolveValid();
      }
    });
  });
};

VFormItem.prototype.rejectValid = function (reason) {
  this.valid = {
    state: "failed",
    info: reason
  };
  this.msgBox.innerText = reason;
  this.el.classList.add("valid-fail");
};

VFormItem.prototype.resolveValid = function () {
  this.valid = {
    state: "success",
    info: "校验成功",
    key: this.key,
    value: this.value
  };
  this.msgBox.innerText = "";
  this.el.classList.remove("valid-fail");
};

VFormItem.prototype.observe = function () {
  Object.defineProperty(this, "value", {
    get: function get() {
      return this.control.value;
    },
    set: function set(value) {
      this.control.value = value;
    }
  });
};

function resolveRule(rule) {
  var validFunc;

  if (rule.prop) {
    validFunc = function validFunc() {
      switch (rule.prop) {
        case "required":
          {
            if (!this.value) {
              return {
                valid: false,
                msg: rule.msg || "验证失败"
              };
            } else {
              return {
                valid: true,
                msg: "校验成功"
              };
            }

            break;
          }

        default:
          throw new Error("Unknow Rule Name: ".concat(rule.prop));
      }
    };
  } else if (rule.pattern) {
    validFunc = function validFunc() {
      var result = rule.pattern.test(this.value);

      if (result) {
        return {
          valid: true,
          msg: "校验成功"
        };
      } else {
        return {
          valid: false,
          msg: "\u672A\u901A\u8FC7\u6B63\u5219\u8868\u8FBE\u5F0F\u9A8C\u8BC1:".concat(rule.pattern)
        };
      }
    };
  } else {
    throw new Error("rule need a name or pattern");
  }

  return validFunc;
}

function parseStyle(style) {
  if (!style) return "";
  var result = "";
  Object.keys(style).forEach(function (prop) {
    result += "".concat(prop, ":").concat(style[prop], ";");
  });
  return result;
}