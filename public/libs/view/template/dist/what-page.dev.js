"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _head = _interopRequireDefault(require("./head.js"));

var _foot = _interopRequireDefault(require("./foot.js"));

var _view = _interopRequireDefault(require("../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var whatPage = {
  template: "\n    <main id=\"content\">\n        __head__\n        __routeView__\n        __foot__\n    </main>",
  components: [_head["default"], _foot["default"]],
  name: "whatPage"
};
whatPage = new _view["default"](whatPage); // whatPage.component(foot);
// head.parent = whatPage;

var _default = whatPage;
exports["default"] = _default;