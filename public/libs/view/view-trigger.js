import {Pipe} from "../Pipe.js";
import {whiteList} from "../../js/index.js";

export function ViewTrigger(options = {}) {
  if (!this instanceof ViewTrigger) {
    return new ViewTrigger(options);
  }
  Pipe.call(this);
  Pipe.call(this);
  this.options = options;
  this.init();
  watchHash.call(this);
}

ViewTrigger.prototype = Object.create(Pipe.prototype);

let proto = ViewTrigger.prototype;
proto.constructor = ViewTrigger;

proto.init = function () {
  let _this = this;
  this._state = {};
  Object.defineProperty(this, "cachedHash", {
    get(key) {
      return sessionStorage.getItem("cachedHash");
    },
    set(val) {
      if (whiteList.includes(val)) return true;
      sessionStorage.setItem("cachedHash", val);
      return true;
    }
  })
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
      // console.log(route)
      if (route.parent) {
        flush.call(this, route.parent);
        this.emit("beforeChildFlush", route);
        route.parent.view.renderView(route.view);
        this.curRoute = route;
        this.emit("afterChildFlush", route);
      } else {
        if (this.curRootRoute === route.pathArr[0]) return;
        this.emit("beforeParentFlush", route);
        if (this.curRootRoute !== route.pathArr[0]) {
          route.view.firstLoad = true;
          this.curRootRoute = route.pathArr[0];
        }
        route.view.mount(this.root);
        // let goon = route.view.firstLoad && route.view.mount(this.root);
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
      location.hash = this.curRoute.path;
      console.log(this.curRoute)
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
          this.cachedHash = destination.path;
          this.matcher.flush.call(this, destination);
        }
      },
      (rej) => {
        location.hash = rej;
        console.log(rej);
      }
    );
  });
}
