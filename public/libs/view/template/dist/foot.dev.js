"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var foot = {
  name: "foot",
  template: "<!-- footer -->\n    <footer class=\"main-footer\">\n        <ul class=\"foot-list\">\n            <li class=\"foot-item wanna\">\n                <span class=\"iconfont icon-jihua2\"></span>\n                <span>Wanna</span>\n            </li>\n            <li class=\"foot-item what active\">\n                <span class=\"iconfont icon-jihua\"></span>\n                <span>What</span>\n            </li>\n            <li class=\"foot-item i\">\n                <span class=\"iconfont icon-wode\"></span>\n                <span>I</span>\n            </li>\n        </ul>\n    </footer>",
  scripts: ["./js/foot.js"]
};
foot = new _view["default"](foot);
var _default = foot;
exports["default"] = _default;