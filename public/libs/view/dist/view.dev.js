"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = View;

var _utils = require("../../js/utils/utils.js");

var vid = 0;
var components = {};

function View(options) {
  if (!this instanceof View) {
    return new View(options);
  }

  this.options = options;
  this.vid = vid++;
  this.init();
  this.parseTemplate();
}

var proto = View.prototype;
proto.scriptHref = document.querySelector("#VIEW_SCRIPTS");

proto.init = function () {
  _utils.utils.assert(this.options.template != null, "View needs a template");

  _utils.utils.assert(this.options.name, "View needs a name");

  this.name = this.options.name;
  this.template = this.options.template;
  this.routeCurrView = [];
  this.target = this.template;
  this.firstLoad = true;
  this.scripts = this.options.scripts || [];
  this.components = this.options.components || [];
};

proto.parseTemplate = function () {
  var _this = this;

  this.target = this.template;
  if (this.components.length === 0) return;
  this.components.forEach(function (component) {
    var name = "__".concat(component.name, "__");
    _this.target = _this.target.replace(new RegExp(name, "g"), component.target);
  });
  this.target = this.target.replace(/__routeView__/g, "<span style='display:none' class='__view__'></span>");
};

proto.component = function (component) {
  this.components.push(component);
  this.parseTemplate();
};

proto.mount = function (el) {
  var _this2 = this;

  el = typeof el === "string" ? document.querySelector(el) : el;
  this.el = el;

  if (el instanceof HTMLElement) {
    el.innerHTML = this.target;
  }

  if (this.firstLoad) {
    this.components.forEach(function (component) {
      component.mount(_this2);
    });
    this.firstLoad = false;
  }

  this.flushScripts();
};

proto.flushScripts = function () {
  var _this3 = this;

  if (this.scripts.length === 0) return;

  if (this.scripts[0] instanceof HTMLScriptElement) {
    this.scripts.forEach(function (s) {
      document.body.removeChild(s);
    });
    this.scripts = this.scripts.map(function (script) {
      var data = script.innerHTML;
      var s = document.createElement("script");
      s.innerHTML = data;
      s.type = "module";
      document.body.appendChild(s);
      return s;
    });
    console.log(this.scripts);
  } else {
    var scripts = this.scripts.map(function (scriptSrc) {
      return axios.get(scriptSrc).then(function (res) {
        return res.data;
      });
    });
    Promise.all(scripts).then(function (resArr) {
      resArr.forEach(function (data, i) {
        var s = document.createElement("script");
        s.innerHTML = data.replace(/<br>/g, "");
        s.type = "module";
        _this3.scripts[i] = s;
      });

      _this3.scripts.forEach(function (s) {
        document.body.appendChild(s);
      });
    });
  }
};

proto.renderView = function (view) {
  var _this4 = this;

  console.log(this.routeCurrView);

  if (this.routeCurrView.length > 0) {
    [].forEach.call(this.routeCurrView, function (route) {
      route.parentNode.removeChild(route.nextElementSibling);
    });
    this.routeCurrView = [];
  }

  this.routeViews = this.el.querySelectorAll(".__view__");
  [].forEach.call(this.routeViews, function (routeView) {
    routeView.outerHTML = "\n        <span style='display:none' class='__view__'></span>\n        ".concat(view.target, "\n        ");
    _this4.routeCurrView = _this4.el.querySelectorAll(".__view__");

    _this4.flushScripts.call(view);
  });
};