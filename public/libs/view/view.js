import { utils } from "../../js/utils/utils.js";
import { Pipe } from "../Pipe.js";
import generate from "./compiler/genCode.js";
import parseHTML from "./compiler/parseHTML.js";
import patchVnode from "./compiler/patch-vnode.js";
import { initGlobal } from "./init-global.js";

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
  this.mount(options.el);
  views.add(this);
}

initGlobal(View);


View.prototype = Object.create(Pipe.prototype);
let proto = View.prototype;
proto.constructor = View;

proto.init = function () {
  utils.assert(this.options.template != null, "View needs a template");
  utils.assert(this.options.name, "View needs a name");
  this.name = this.options.name;
  this.template = this.options.template;
  this.initData();
  this.initMethods();
  this.ast = parseHTML(this.template.trim());
  this._render = new Function('instance', `with(instance){return eval(${generate(this.ast[0])})}`);
  this.vnode = this._render(this);
  this.$el = patchVnode(null, this.vnode);
  this.slot = this.options.slot || {};
  this.components = this.options.components || [];
  this.hooks = {};
  this.renderType = this.options.renderType || "default";
  this.routeCurrView = [];
  this.target = this.template;
  this.firstLoad = true;
};

proto.initData = function () {
  this.$data = this.options.data || {};
  Object.keys(this.$data).forEach(key => {
    this[key] = this.$data[key];
  });
}

proto.initMethods = function () {
  this.$methods = this.options.methods || {};
  Object.keys(this.$methods).forEach(key => {
    this[key] = this.$methods[key].bind(this);
  });
}

proto.loadHooks = function () {
  hooks.forEach((hook) => {
    if (!this.hooks[hook]) this.hooks[hook] = [];
    this.options[hook] && this.hooks[hook].push(this.options[hook]);
  });
};

proto.update = function () {
  this.parseTemplate();
  this.mount(this.el);
}

proto.parseTemplate = function () {
  this.target = this.template;
  this.renderSlot();
  if (this.components.length === 0) return;
  this.components.forEach((componentConfig) => {
    let notEnd = true;
    while (notEnd) {
      notEnd = false;
      const name = `__${componentConfig.name}__`;
      if (this.target.indexOf(name) === -1) return;
      this.target = this.target.replace(new RegExp(name), () => {
        notEnd = true;
        const instance = new componentConfig.component;
        return instance.target;
      });
    }
  });
};

proto.component = function (component) {
  this.components.push(component);
  this.parseTemplate();
};

proto.mount = function (el) {
  this.executeHooks("beforeMount");
  // this.renderSlot();
  if (!el) {
    this.executeHooks("mounted");
    return this.target;
  }
  el = typeof el === "string" ? document.querySelector(el) : el;
  if (el instanceof HTMLElement) {
    if (this.renderType === "default") {
      // el.innerHTML = this.target;
      el.appendChild(this.$el);
    } else if (this.renderType === "append") {
      let wrap = document.createElement("span");
      wrap.innerHTML = this.target;
      el.appendChild(wrap);
      this.parentEl = wrap.parentElement;
      wrap.outerHTML = wrap.innerHTML;
      this.el = this.parentEl.lastElementChild;
    }
  }

  this.el = el;

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
      if (element instanceof Function) {
        element = element.call(this);
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

