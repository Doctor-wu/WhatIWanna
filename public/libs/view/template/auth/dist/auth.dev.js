"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var auth = {
  name: "auth",
  template: "\n    <section class=\"auth\">\n    __routeView__\n    <div class=\"mask\"></div>\n    </section>",
  scripts: []
};
auth = new _view["default"](auth);
var _default = auth;
exports["default"] = _default;