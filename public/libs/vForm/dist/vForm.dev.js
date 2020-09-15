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
  var _this = this;

  this.el = options.el || document.createElement("form");
  this.el.className = "vform";
  this.items = options.items || [];
  this.title = options.title;
  this.submit = new Promise(function (resolve, reject) {
    _this.submitTrigger = resolve;
  })["catch"](function (e) {
    console.warn("[valid fail]", e);
  });
};

VForm.prototype.loadItem = function () {
  var _this2 = this;

  if (this.items.length <= 0) return;
  this.items = this.items.map(function (item) {
    if (item instanceof _vFormItem.VFormItem) return new _vFormItem.VFormItem(item.options).mount(_this2);else return new _vFormItem.VFormItem(item).mount(_this2);
  });
  this.initBtn();
};

VForm.prototype.validate = function () {
  if (this.items.length === 0) return {
    state: 'success',
    info: []
  };
  var arr = [];
  this.items.forEach(function (item) {
    arr.push(item.validate());
  });
  var success = arr.every(function (item) {
    return item.state === "success";
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

VForm.prototype.initBtn = function () {
  var btnGrp = document.createElement("div");
  btnGrp.className = "btn-wrap";
  this.resetEL = document.createElement("button");
  this.resetEL.className = "btn btn-6 btn-default";
  this.resetEL.type = "reset";
  this.resetEL.innerHTML = "重置";
  this.submitEL = document.createElement("button");
  this.submitEL.className = "btn btn-6 btn-success";
  this.submitEL.type = "submit";
  this.submitEL.innerHTML = "提交";
  resolveSubmit.call(this);
  btnGrp.appendChild(this.resetEL);
  btnGrp.appendChild(this.submitEL);
  this.el.appendChild(btnGrp);
};

function resolveSubmit() {
  var _this3 = this;

  this.submitEL.addEventListener("click", function (ev) {
    ev.preventDefault();

    var valid = _this3.validate();

    if (valid.state === "success") {
      var data = {};

      _this3.items.forEach(function (item) {
        data[item.key] = item.value;
      });

      _this3.submitTrigger(Object.assign(valid, data));
    } else {
      console.warn("[valid failed] ".concat(JSON.stringify(valid)));
    }

    ;
  });
}