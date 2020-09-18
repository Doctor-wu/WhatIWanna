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
}

var proto = Viewtrigger.prototype;

proto.init = function () {
  this.root = typeof this.options.root === "string" ? document.querySelector(this.options.root) : this.options.root;
  this.curRootRoute = "";
};

proto.route = function (routeMap) {
  this.map = routeMap.map;
  this.home = routeMap.home || "/";
  this.matcher = matcher(this.map);
  location.hash = this.home;
};

function matcher(map) {
  var routeMap = parseRoute(map);

  function match(hash) {
    return routeMap[hash];
  }

  function flush(route) {
    if (route) {
      if (route.parent) {
        flush.call(this, route.parent);
        route.parent.view.renderView(route.view);
      } else {
        notify.success(route.name);

        if (this.curRootRoute !== route.pathArr[0]) {
          route.view.firstLoad = true;
          this.curRootRoute = route.pathArr[0];
        }

        route.view.firstLoad && route.view.mount(this.root);
      }
    }
  }

  function addRoute(page) {
    if (!routeMap[page.hash]) routeMap[page.hash] = [];
    routeMap[page.hash].push(page);
  }

  return {
    match: match,
    flush: flush,
    addRoute: addRoute
  };
}

function parseRoute(map) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var routeMap = {};
  map.forEach(function (route) {
    if (parent) {
      route.parent = parent;
      route.pathArr = parent.pathArr.concat();
      route.pathArr.push(route.path);
      route.path = route.pathArr.join("/");
    } else {
      route.pathArr = [route.path];
    }

    ;
    routeMap[route.path] = route;

    if (route.children && route.children.length > 0) {
      route.children.forEach(function (child) {
        Object.assign(routeMap, parseRoute([child], route));
      });
    }
  });
  return routeMap;
}

function watchHash() {
  var _this = this;

  location.hash = "";
  window.addEventListener("hashchange", function (ev) {
    // console.log(ev, this);
    _this.matcher.flush.call(_this, _this.matcher.match(ev.newURL.split("#")[1]));
  });
}