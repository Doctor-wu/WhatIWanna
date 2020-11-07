import { Pipe } from "../Pipe.js";

export function Viewtrigger(options = {}) {
  if (!this instanceof Viewtrigger) {
    return new Viewtrigger(options);
  }
  Pipe.call(this);
  this.options = options;
  this.init();
  watchHash.call(this);
}

Viewtrigger.prototype = Object.create(Pipe.prototype);

let proto = Viewtrigger.prototype;
proto.constructor = Viewtrigger;

proto.init = function () {
  let _this = this;
  this._state = {};
  this.root =
    typeof this.options.root === "string"
      ? document.querySelector(this.options.root)
      : this.options.root;
  this.curRootRoute = "";
  this.data = new Proxy(_this._state, {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      return Reflect.set(target, key, value, receiver);
    },
  });
  this.curRoute = null;
  this.beforeRouteHooks = [];
};

proto.route = function (routeMap) {
  this.map = routeMap.map;
  this.home = routeMap.home || "/";
  this.matcher = matcher(this.map);
  location.hash = this.home;
  return this;
};

proto.beforeRoute = function (executor) {
  this.regist("beforeRouteHooks", (from, to) => {
    return new Promise((resolve, reject) => {
      executor(from, to, resolve, reject);
    });
  });
};

function matcher(map) {
  const routeMap = parseRoute(map);

  function match(hash) {
    return routeMap[hash];
  }

  function flush(route) {
    if (route) {
      if (route.parent) {
        flush.call(this, route.parent);
        this.emit("beforeChildFlush", route);
        route.parent.view.renderView(route.view);
        this.curRoute = route;
        this.emit("afterChildFlush", route);
      } else {
        this.emit("beforeParentFlush", route);
        if (this.curRootRoute !== route.pathArr[0]) {
          route.view.firstLoad = true;
          this.curRootRoute = route.pathArr[0];
        }
        let goon = route.view.firstLoad && route.view.mount(this.root);
        this.emit("afterParentFlush", route);
      }
    }
  }

  function addRoute(page) {
    if (!routeMap[page.hash]) routeMap[page.hash] = [];
    routeMap[page.hash].push(page);
  }

  return {
    match,
    flush,
    addRoute,
  };
}

function parseRoute(map, parent = null) {
  let routeMap = {};
  map.forEach((route) => {
    if (parent) {
      route.parent = parent;
      route.pathArr = parent.pathArr.concat();
      route.pathArr.push(route.path);
      route.path = route.pathArr.join("/");
    } else {
      route.pathArr = [route.path];
    }
    routeMap[route.path] = route;
    if (route.children && route.children.length > 0) {
      route.children.forEach((child) => {
        Object.assign(routeMap, parseRoute([child], route));
      });
    }
  });
  return routeMap;
}

function watchHash() {
  location.hash = "";
  window.addEventListener("hashchange", (ev) => {
    let hash = ev.newURL.split("#")[1],
      destination = this.matcher.match(hash);
    if (!hash) return;
    if (!destination) {
      notify.warn(`未知路由: ${hash}, 请检查URL`);
      return;
    }
    let result = this.emit("beforeRouteHooks", this.curRoute, destination);
    Promise.all(result).then(
      (res) => {
        let customHash = res.slice(-1)[0] || hash;
        destination = this.matcher.match(customHash);
        if (!destination) {
          notify.warn(`未知路由: ${customHash}`);
        } else {
          this.matcher.flush.call(this, destination);
        }
      },
      (rej) => {
        console.log(rej);
      }
    );
  });
}
