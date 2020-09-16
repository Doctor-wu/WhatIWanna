"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var head = {
  name: "head",
  template: "<!-- head -->\n    <header id=\"main-header\">\n        <section class=\"head\">\n            <img style=\"width: 2rem;height:2rem;\" src=\"./source/img/avatar.jpg\" alt=\"avatar\" class=\"head-avatar\">\n            <div class=\"head-info\">\n                <h3 class=\"head-title\">What I Wanna</h3>\n                <span class=\"username\">Doctorwu</span>\n            </div>\n        </section>\n        <input type=\"date\" class=\"head-date\" style=\"display: block;\">\n        <section class=\"date\">\n            <span class=\"head-date-span\"></span>\n        </section>\n    </header>",
  scripts: ["./js/head.js"]
};
head = new _view["default"](head);
var _default = head;
exports["default"] = _default;