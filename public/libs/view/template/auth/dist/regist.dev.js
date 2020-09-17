"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../../view.js"));

var _login = _interopRequireDefault(require("./login.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var regist = {
  name: "login",
  template: "<div>\n    \u6CE8\u518C\n    </div>",
  components: [_login["default"]],
  scripts: []
};
regist = new _view["default"](regist);
var _default = regist;
exports["default"] = _default;