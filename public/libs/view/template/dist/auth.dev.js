"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = {
  name: "login",
  template: "\n    <section class=\"login\">\n    __routeView__\n    </section>",
  scripts: []
};
login = new _view["default"](login);
var _default = login;
exports["default"] = _default;