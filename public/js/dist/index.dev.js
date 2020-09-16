"use strict";

var _viewTrigger = require("../libs/view/view-trigger.js");

var _whatPage = _interopRequireDefault(require("../libs/view/template/what-page.js"));

var _test = _interopRequireDefault(require("../libs/view/template/test2.js"));

var _whatList = _interopRequireDefault(require("../libs/view/template/whatList.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// whatPage.mount("#app");
var viewMap = {
  home: '/home/whatList',
  map: [{
    path: '/home',
    name: 'layout',
    view: _whatPage["default"],
    children: [{
      path: 'whatList',
      name: 'whatList',
      view: _whatList["default"]
    }, {
      path: 'test2',
      name: 'test2',
      view: _test["default"]
    }]
  }]
};
new _viewTrigger.Viewtrigger({
  root: document.querySelector("#app")
}).route(viewMap);