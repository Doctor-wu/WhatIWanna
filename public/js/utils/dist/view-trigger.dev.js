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

  this.views = this.options.views || [];
  this.matcher = matcher(this.views);
  this.views.forEach(function (view) {
    _this.mountPage(view);
  });
};

Viewtrigger.prototype.mountPage = function (view) {
  console.log(view);
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

function watchHash() {
  var _this2 = this;

  window.addEventListener("hashchange", function (ev) {
    // console.log(ev, this);
    _this2.matcher.flush(_this2.matcher.match("#" + ev.newURL.split("#")[1]));
  });
}