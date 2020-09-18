"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = View;

var _utils = require("../../js/utils/utils.js");

var vid = 0;
var hooks = ["beforeMount", "mounted"];

function View(options) {
  if (!this instanceof View) {
    return new View(options);
  }

  this.options = options;
  this.vid = vid++;
  this.init();
  this.loadHooks();
  this.parseTemplate();
}

var proto = View.prototype;

proto.init = function () {
  _utils.utils.assert(this.options.template != null, "View needs a template");

  _utils.utils.assert(this.options.name, "View needs a name");

  this.name = this.options.name;
  this.template = this.options.template;
  this.slot = this.options.slot || {};
  this.hooks = {};
  this.renderType = this.options.renderType || "default";
  this.routeCurrView = [];
  this.target = this.template;
  this.firstLoad = true;
  this.scripts = this.options.scripts || [];
  this.components = this.options.components || [];
};

proto.loadHooks = function () {
  var _this = this;

  hooks.forEach(function (hook) {
    _this.hooks[hook] = _this.options.hook;
  });
};

proto.parseTemplate = function () {
  var _this2 = this;

  this.target = this.template;
  this.target = this.target.replace(/__routeView__/g, "<span style='display:none' class='__view__'></span>");
  if (this.components.length === 0) return;
  this.components.forEach(function (component) {
    var name = "__".concat(component.name, "__");
    _this2.target = _this2.target.replace(new RegExp(name, "g"), component.target);
  });
};

proto.component = function (component) {
  this.components.push(component);
  this.parseTemplate();
};

proto.mount = function (el) {
  var _this3 = this;

  el = typeof el === "string" ? document.querySelector(el) : el;
  this.el = el;
  this.renderSlot();
  this.executeHooks("beforeMount");

  if (el instanceof HTMLElement) {
    if (this.renderType === "default") {
      el.innerHTML = this.target;
    } else if (this.renderType === "append") {
      var wrap = document.createElement("span");
      wrap.innerHTML = this.target;
      el.appendChild(wrap);
      this.parentEl = wrap.parentElement;
      wrap.outerHTML = wrap.innerHTML;
      this.el = this.parentEl.lastElementChild;
    }
  }

  if (this.firstLoad) {
    this.components.forEach(function (component) {
      component.mount(_this3);
    });
    this.firstLoad = false;
  }

  this.flushScripts();
  this.executeHooks("mounted");
  return this;
};

proto.executeHooks = function (hookName) {
  if (this.hooks[hookName]) {
    this.hooks[hookName].call(this);
  }
};

proto.renderSlot = function () {
  for (var key in this.slot) {
    if (this.slot.hasOwnProperty(key)) {
      var element = this.slot[key];

      if (element instanceof HTMLElement) {
        element = element.outerHTML;
      }

      if (key === "default") {
        key = "slot";
      }

      var name = "__".concat(key, "__");
      this.target = this.target.replace(new RegExp(name, "g"), element);
    }
  }
};

proto.flushScripts = function () {
  var _this4 = this;

  if (this.options.plainScript) {
    var script = document.createElement("script");
    script.innerHTML = this.options.plainScript;
    script.type = "module";
    this.scripts.push(script);
    script = null;
    this.options.plainScript = null;
  }

  if (this.scripts.length === 0) return;

  if (this.scripts[0] instanceof HTMLScriptElement) {
    this.scripts.forEach(function (s) {
      try {
        document.body.removeChild(s);
      } catch (e) {}
    });
    this.scripts = this.scripts.map(function (script) {
      var data = script.innerHTML;
      var s = document.createElement("script");
      s.innerHTML = data;
      s.type = "module";
      document.body.appendChild(s);
      return s;
    });
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
        _this4.scripts[i] = s;
      });

      _this4.scripts.forEach(function (s) {
        document.body.appendChild(s);
      });
    });
  }
};

proto.renderView = function (view) {
  var _this5 = this;

  if (this.routeCurrView.length > 0) {
    [].forEach.call(this.routeCurrView, function (route) {
      route.parentNode.removeChild(route.nextElementSibling);
    });
    this.routeCurrView = [];
  }

  this.routeViews = this.el.querySelectorAll(".__view__");
  [].forEach.call(this.routeViews, function (routeView) {
    routeView.outerHTML = "\n        <span style='display:none' class='__view__'></span>\n        ".concat(view.target, "\n        ");
    _this5.routeCurrView = _this5.el.querySelectorAll(".__view__");
  });
  this.flushScripts.call(view);
};