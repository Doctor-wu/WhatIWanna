"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var test1 = {
  name: "whatList",
  template: "<div>\n    <ul class=\"what-list\">\n    </ul>\n\n    <span class=\"add-schedule\">\n        <span class=\"iconfont icon-jia\"></span>\n    </span>\n\n    <div class=\"what-form-wrap hide\">\n        <h2 class=\"form-title\">\n            \u65B0\u589E\u4E8B\u9879\n            <a href=\"javascript:0\" class=\"close-what-form\"><span class=\"iconfont icon-cuowu\"></span></a>\n        </h2>\n        <i class=\"what-form\"></i>\n    </div>\n    </div>",
  scripts: ["./js/what_module.js", "./js/what_form.js"]
};
test1 = new _view["default"](test1);
var _default = test1;
exports["default"] = _default;