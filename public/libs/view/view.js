import { utils } from "../../js/utils/utils.js";
let vid = 0;

export default function View(options) {
    if (!this instanceof View) {
        return new View(options);
    }
    this.options = options;
    this.vid = vid++;
    this.init();
    this.parseTemplate();
}

let proto = View.prototype;
proto.scriptHref = document.querySelector("#VIEW_SCRIPTS")


proto.init = function() {
    utils.assert(this.options.template != null, "View needs a template");
    utils.assert(this.options.name, "View needs a name");
    this.name = this.options.name;
    this.template = this.options.template;
    this.routeCurrView = [];
    this.target = this.template;
    this.firstLoad = true;
    this.scripts = this.options.scripts || [];
    this.components = this.options.components || [];
}


proto.parseTemplate = function() {
    this.target = this.template;
    this.target = this.target.replace(/__routeView__/g, "<span style='display:none' class='__view__'></span>");
    if (this.components.length === 0) return;
    this.components.forEach((component) => {
        let name = `__${component.name}__`;
        this.target = this.target.replace(new RegExp(name, "g"), component.target);
    });
}


proto.component = function(component) {
    this.components.push(component);
    this.parseTemplate();
}

proto.mount = function(el) {
    el = typeof el === "string" ? document.querySelector(el) : el;
    this.el = el;
    if (el instanceof HTMLElement) {
        el.innerHTML = this.target;
    }

    if (this.firstLoad) {
        this.components.forEach(component => {
            component.mount(this);
        })
        this.firstLoad = false;
    }
    this.flushScripts();
}

proto.flushScripts = function() {
    if (this.options.plainScript) {
        let script = document.createElement("script");
        script.innerHTML = this.options.plainScript;
        script.type = "module";
        this.scripts.push(script);
        script = null;
        this.options.plainScript = null;
    }
    if (this.scripts.length === 0) return;
    if (this.scripts[0] instanceof HTMLScriptElement) {
        this.scripts.forEach(s => {
            try {
                document.body.removeChild(s);
            } catch (e) {}
        });
        this.scripts = this.scripts.map(script => {
            let data = script.innerHTML;
            let s = document.createElement("script");
            s.innerHTML = data;
            s.type = "module";
            document.body.appendChild(s);
            return s;
        });
    } else {
        let scripts = this.scripts.map(scriptSrc => {
            return axios.get(scriptSrc).then(res => {
                return res.data;
            });
        });

        Promise.all(scripts)
            .then(resArr => {
                resArr.forEach((data, i) => {
                    let s = document.createElement("script");
                    s.innerHTML = data.replace(/<br>/g, "");
                    s.type = "module";
                    this.scripts[i] = s;
                });
                this.scripts.forEach(s => {
                    document.body.appendChild(s);
                });
            });
    }
}

proto.renderView = function(view) {
    if (this.routeCurrView.length > 0) {
        [].forEach.call(this.routeCurrView, (route => {
            route.parentNode.removeChild(route.nextElementSibling);
        }));
        this.routeCurrView = [];
    }
    this.routeViews = this.el.querySelectorAll(".__view__");
    [].forEach.call(this.routeViews, (routeView => {
        routeView.outerHTML = `
        <span style='display:none' class='__view__'></span>
        ${view.target}
        `
        this.routeCurrView = this.el.querySelectorAll(".__view__");
    }));
    this.flushScripts.call(view);
}