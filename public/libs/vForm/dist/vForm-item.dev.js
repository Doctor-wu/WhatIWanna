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

  this.buildControl();
  var msgBox = document.createElement("div");
  msgBox.className = "vform-item-msgbox";
  this.msgBox = msgBox; // msgBox.innerText = "测试数据"

  label && this.el.appendChild(label);
  this.el.appendChild(this.control);
  this.el.appendChild(msgBox);
}; // 可在这个方法扩展表单控件


VFormItem.prototype.buildControl = function () {
  var control = document.createElement(this.tag);

  if (this.tag === "select") {
    _utils.utils.assert(this.opts, "select need some options");

    for (var key in this.opts) {
      if (this.opts.hasOwnProperty(key)) {
        var el = document.createElement("option");
        el.innerText = key;
        el.value = this.opts[key];
        el.style.background = this.options[key];
        el.style.padding = ".1rem 0";
        control.appendChild(el);
        control.value = null;
      }
    } // 重写observe 以解决多选的value无法是多个option值的问题


    var _this = this;

    this.observe = function () {
      console.log("observe");
      Object.defineProperty(this, "value", {
        get: function get() {
          var arr = [];
          [].forEach.call(_this.control.selectedOptions, function (option) {
            arr.push(option.value);
          });
          return arr.toString();
        },
        set: function set(value) {
          _this.value = value;
        }
      });
    };
  }

  control.className = "vform-item-control";
  control.id = "item".concat(this.id);
  control.setAttribute("required", true); // Object.assign(control, this.options.attrs || {});

  for (var _key in this.options.attrs) {
    if (this.options.attrs.hasOwnProperty(_key)) {
      control.setAttribute(_key, this.options.attrs[_key]);
    }
  }

  control.setAttribute("style", parseStyle(this.options.style));
  this.control = control;
}; // 挂载到VForm上


VFormItem.prototype.mount = function (form) {
  _utils.utils.assert(form instanceof _vForm.VForm, "VFormItem need mount to VForm");

  form.el.appendChild(this.el);
  this.initRules();
  return this;
}; // 独立的验证模块


VFormItem.prototype.validate = function () {
  var _this2 = this;

  if (this.rules.length === 0) {
    return {
      state: "success",
      info: []
    };
  }

  ;
  this.rules.map(function (rule) {
    return resolveRule(rule).call(_this2);
  }).forEach(function (item) {
    if (!item.valid) {
      _this2.rejectValid(item.msg);
    }
  });
  return this.valid;
}; // 初始化规则，将相应规则的事件绑定上


VFormItem.prototype.initRules = function () {
  var _this3 = this;

  this.rules.forEach(function (item) {
    var validFunc = resolveRule.call(_this3, item);

    _this3.control.addEventListener(item.trigger || "blur", function () {
      var result = validFunc.call(_this3);

      if (!result.valid) {
        _this3.rejectValid(result.msg);
      } else {
        _this3.resolveValid();
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