export function Viewtrigger(options = {}) {
    this.options = options;
    this.init();
    watchHash.call(this);
}

let proto = Viewtrigger.prototype;

proto.init = function() {
    this.root = typeof this.options.root === "string" ? document.querySelector(this.options.root) : this.options.root;
    this.curRootRoute = "";
}

proto.route = function(routeMap) {
    this.map = routeMap.map;
    this.home = routeMap.home || "/";
    this.matcher = matcher(this.map);
    location.hash = this.home;
}

function matcher(map) {

    const routeMap = parseRoute(map);

    function match(hash) {
        return routeMap[hash]
    }

    function flush(route) {
        if (route) {
            if (route.parent) {
                flush.call(this, route.parent);
                route.parent.view.renderView(route.view);
            } else {
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
        match,
        flush,
        addRoute
    }
}



function parseRoute(map, parent = null) {
    let routeMap = {};
    map.forEach(route => {
        if (parent) {
            route.parent = parent
            route.pathArr = parent.pathArr.concat();
            route.pathArr.push(route.path);
            route.path = route.pathArr.join("/");
        } else {
            route.pathArr = [route.path];
        };
        routeMap[route.path] = route;
        if (route.children && route.children.length > 0) {
            route.children.forEach(child => {
                Object.assign(routeMap, parseRoute([child], route));
            })
        }
    })
    return routeMap;
}


function watchHash() {
    location.hash = "";
    window.addEventListener("hashchange", (ev) => {
        // console.log(ev, this);
        this.matcher.flush.call(this, this.matcher.match(ev.newURL.split("#")[1]));
    });
}