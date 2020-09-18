"use strict";

var _viewTrigger = require("../libs/view/view-trigger.js");

var _whatPage = _interopRequireDefault(require("../libs/view/template/whatPage/what-page.js"));

var _myInfo = _interopRequireDefault(require("../libs/view/myInfo/myInfo.js"));

var _whatList = _interopRequireDefault(require("../libs/view/template/whatPage/whatList.js"));

var _wanna = _interopRequireDefault(require("../libs/view/wanna/wanna.js"));

var _auth = _interopRequireDefault(require("../libs/view/template/auth/auth.js"));

var _login = _interopRequireDefault(require("../libs/view/template/auth/login.js"));

var _regist = _interopRequireDefault(require("../libs/view/template/auth/regist.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var viewMap = {
  home: '/auth/login',
  map: [{
    path: '/home',
    name: '首页',
    view: _whatPage["default"],
    children: [{
      path: 'whatList',
      name: 'whatList',
      view: _whatList["default"]
    }, {
      path: 'myInfo',
      name: 'myInfo',
      view: _myInfo["default"]
    }, {
      path: 'wanna',
      name: 'wanna',
      view: _wanna["default"]
    }]
  }, {
    path: "/auth",
    name: "认证",
    view: _auth["default"],
    children: [{
      path: 'login',
      name: 'login',
      view: _login["default"]
    }, {
      path: 'regist',
      name: 'regist',
      view: _regist["default"]
    }]
  }]
};
new _viewTrigger.Viewtrigger({
  root: document.querySelector("#app")
}).route(viewMap);