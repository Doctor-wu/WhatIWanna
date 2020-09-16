"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var myInfo = {
  name: "myInfo",
  template: "\n    <section class=\"myInfo\">\n        MyInfo\n    </section>\n    "
};
myInfo = new _view["default"](myInfo);
var _default = myInfo;
exports["default"] = _default;