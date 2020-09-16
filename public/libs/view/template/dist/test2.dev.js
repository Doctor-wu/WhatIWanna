"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var test2 = {
  name: "test2",
  template: "\n    <div style=\"width: 100vw;height: 100vh;background: violet;\"></div>"
};
test2 = new _view["default"](test2);
var _default = test2;
exports["default"] = _default;