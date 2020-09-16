"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Viewtrigger = Viewtrigger;

function Viewtrigger() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  this.options = options;
  this.init();
  watchHash.call(this);
  console.log(this);
}

Viewtrigger.prototype.init = function () {
  var _this = this;

  this.pages = this.options.pages || [];
  this.matcher = matcher(this.pages);
  this.pages.forEach(function (page) {
    _this.mountPage(page);
  });
};

Viewtrigger.prototype.mountPage = function (page) {
  console.log(page);
  renderTemplate(page);
};

function matcher(pages) {
  location.hash = location.hash ? location.hash : "/";
  var routesMap = {};

  function match(hash) {
    console.log(hash);
    return routesMap;
  }

  function flush(page) {}

  function addRoute(page) {
    if (!routesMap[page.hash]) routesMap[page.hash] = [];
    routesMap[page.hash].push(page);
  }

  return {
    match: match,
    flush: flush,
    addRoute: addRoute
  };
}

function renderTemplate(page) {
  if (!page.components) return;
  page.components.forEach(function (component) {
    var name = "__".concat(component.name, "__");
    console.log(new RegExp(name, "g"));
    page.template = page.template.replace(new RegExp(name, "g"), component.template);
  });
  console.log(page.template);
}

function watchHash() {
  var _this2 = this;

  window.addEventListener("hashchange", function (ev) {
    // console.log(ev, this);
    _this2.matcher.flush(_this2.matcher.match("#" + ev.newURL.split("#")[1]));
  });
}