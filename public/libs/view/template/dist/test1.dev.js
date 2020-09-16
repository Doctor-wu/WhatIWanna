"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var test1 = {
  name: "test1",
  template: "\n    <div style=\"width: 100vw;height: 100vh;background: lightseagreen;\"></div>\n    "
};
test1 = new _view["default"](test1);
var _default = test1;
exports["default"] = _default;