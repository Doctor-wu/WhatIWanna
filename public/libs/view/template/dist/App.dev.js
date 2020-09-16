"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../view.js"));

var _routeView = _interopRequireDefault(require("./route-view.js"));

var _test = _interopRequireDefault(require("./test1.js"));

var _test2 = _interopRequireDefault(require("./test2.js"));

var _whatPage = _interopRequireDefault(require("./what-page.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var viewMap = {
  map: [{
    path: '/whatList',
    name: 'layout',
    view: _whatPage["default"],
    children: [{
      path: 'test1',
      name: 'test1',
      view: _test["default"]
    }, {
      path: 'test2',
      name: 'test2',
      view: _test2["default"]
    }]
  }]
};
var app = new _view["default"]({
  template: "__routeView__",
  el: "#app",
  components: [_routeView["default"].route(viewMap)]
});
console.log(app);
var _default = app;
exports["default"] = _default;