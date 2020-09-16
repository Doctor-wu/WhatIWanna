"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whatPage = void 0;
var whatPage = {
  template: "<main id=\"content\">\n    <!-- head -->\n    <header id=\"main-header\">\n        <section class=\"head\">\n            <img style=\"width: 2rem;height:2rem;\" src=\"./source/img/avatar.jpg\" alt=\"avatar\" class=\"head-avatar\">\n            <div class=\"head-info\">\n                <h3 class=\"head-title\">What I Wanna</h3>\n                <span class=\"username\">Doctorwu</span>\n            </div>\n        </section>\n        <input type=\"date\" class=\"head-date\" style=\"display: block;\">\n        <section class=\"date\">\n            <span class=\"head-date-span\"></span>\n        </section>\n    </header>\n\n    <!-- list -->\n    <ul class=\"what-list\">\n    </ul>\n\n    <span class=\"add-schedule\">\n        <span class=\"iconfont icon-jia\"></span>\n    </span>\n\n    <div class=\"what-form-wrap hide\">\n        <h2 class=\"form-title\">\n            \u65B0\u589E\u4E8B\u9879\n            <a href=\"javascript:0\" class=\"close-what-form\"><span class=\"iconfont icon-cuowu\"></span></a>\n        </h2>\n        <i class=\"what-form\"></i>\n    </div>\n\n\n    <!-- footer -->\n    <footer class=\"main-footer\">\n        <ul class=\"foot-list\">\n            <li class=\"foot-item\">\n                <span class=\"iconfont icon-jihua2\"></span>\n                <span>Wanna</span>\n            </li>\n            <li class=\"foot-item active\">\n                <span class=\"iconfont icon-jihua\"></span>\n                <span>What</span>\n            </li>\n            <li class=\"foot-item\">\n                <span class=\"iconfont icon-wode\"></span>\n                <span>I</span>\n            </li>\n        </ul>\n    </footer>\n</main>",
  root: "#content",
  scripts: ["./js/what_module.js", "./js/head.js", "@@./js/what_form.js"],
  sheets: ["./css/what-form.css", "./js/utils/passive.js", "./js/index.js", ""]
};
exports.whatPage = whatPage;