"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var wanna = {
  name: "wanna",
  template: "\n    <section class=\"myInfo\">\n        Wanna\n    </section>\n    ",
  plainScript: "\n        notify.danger({\n            msg: \"\u6D4B\u8BD5\u9519\u8BEF\"\n        })\n    "
};
wanna = new _view["default"](wanna);
var _default = wanna;
exports["default"] = _default;