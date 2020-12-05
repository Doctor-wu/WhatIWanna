import {utils} from "../../js/utils/utils.js";
import {Pipe} from "../Pipe.js";

let vid = 0;

let hooks = ["beforeMount", "mounted"];
window.views = new WeakSet();

export default function View(options) {
  if (!this instanceof View) {
    return new View(options);
  }
  Pipe.call(this);
  this.options = options;
  this.vid = vid++;
  this.init();
  this.loadHooks();
  this.parseTemplate();
  views.add(this);
  // console.log(this)
}
View.prototype = Object.create(Pipe.prototype);
let proto = View.prototype;
proto.constructor = View;

proto.init = function () {
  utils.assert(this.options.template != null, "View needs a template");
  utils.assert(this.options.name, "View needs a name");
  this.name = this.options.name;
  this.template = this.options.template;
  this.slot = this.options.slot || {};
  this.hooks = {};
  this.hooks["mounted"] = [() => {
    this.components.forEach((component) => {
      component.mount(this);
    });
  }]
  this.renderType = this.options.renderType || "default";
  this.routeCurrView = [];
  this.target = this.template;
  this.firstLoad = true;
  this.scripts = this.options.scripts || [];
  this.components = this.options.components || [];
};

proto.loadHooks = function () {
  hooks.forEach((hook) => {
    if (!this.hooks[hook]) this.hooks[hook] = [];
    this.options[hook] && this.hooks[hook].push(this.options[hook]);
  });
};

proto.parseTemplate = function () {
  this.target = this.template;
  this.target = this.target.replace(
    /__routeView__/g,
    "<span style='display:none' class='__view__'></span>"
  );
  if (this.components.length === 0) return;
  this.components.forEach((component) => {
    let name = `__${component.name}__`;
    this.target = this.target.replace(new RegExp(name, "g"), `<div class="view_component__wrapper" id=COMPONENT${component.vid}>${component.target}</div>`);
  });
};

proto.component = function (component) {
  this.components.push(component);
  this.parseTemplate();
};

proto.mount = function (el) {
  el = typeof el === "string" ? document.querySelector(el) : el;
  if (!this.el && el instanceof View) {
    this.el = el.el.querySelector(`#COMPONENT${this.vid}`);
  }
  if (!this.el) {
    this.el = el;
  }

  this.renderSlot();
  this.executeHooks("beforeMount");
  if (el instanceof HTMLElement) {
    if (this.renderType === "default") {
      el.innerHTML = this.target;
    } else if (this.renderType === "append") {
      let wrap = document.createElement("span");
      wrap.innerHTML = this.target;
      el.appendChild(wrap);
      this.parentEl = wrap.parentElement;
      wrap.outerHTML = wrap.innerHTML;
      this.el = this.parentEl.lastElementChild;
    }
  }

  if (this.firstLoad) {
    this.firstLoad = false;
  }
  // this.flushScripts();
  this.executeHooks("mounted");
  return this;
};

proto.executeHooks = function (hookName) {
  if (this.hooks[hookName]) {
    this.hooks[hookName].forEach((hook) => {
      hook.call(this);
    });
  }
};

proto.renderSlot = function () {
  for (let key in this.slot) {
    if (this.slot.hasOwnProperty(key)) {
      let element = this.slot[key];
      if (element instanceof HTMLElement) {
        element = element.outerHTML;
      }
      if (key === "default") {
        key = "slot";
      }
      let name = `__${key}__`;
      this.target = this.target.replace(new RegExp(name, "g"), element);
    }
  }
};


proto.addHooks = function (hookName, fn) {
  this.hooks[hookName] = this.hooks[hookName] || [];
  this.hooks[hookName].push(fn);
}


proto.renderView = function (view) {
  if (view.el) {
    view.addHooks("mounted", () => {
      view.components.forEach((component) => {
        component.mount(view);
      });
    })
  }
  if (this.routeCurrView.length > 0) {
    [].forEach.call(this.routeCurrView, (route) => {
      route.parentNode.removeChild(route.nextElementSibling);
    });
    this.routeCurrView = [];
  }
  this.routeViews = this.el.querySelectorAll(".__view__");
  [].forEach.call(this.routeViews, (routeView) => {
    let append = document.createElement("div");
    append.classList.add("route_view__wrapper")
    append.style.height = "100%";
    append.style.width = "100%";
    append.innerHTML = `
        ${view.target}
        `;
    view.el = append;
    routeView.parentNode.insertBefore(append, routeView.nextElementSibling);
    view.mount(this);
    this.routeCurrView = this.el.querySelectorAll(".__view__");
  });
};
