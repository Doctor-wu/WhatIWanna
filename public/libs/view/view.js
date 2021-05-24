import {
  utils
} from "../../js/utils/utils.js";
import {
  Pipe
} from "../Pipe.js";
import generate from "./compiler/genCode.js";
import parseHTML from "./compiler/parseHTML.js";
import {
  initGlobal
} from "./init-global.js";
import { setupRenderEffect } from "./reactive/effective.js";

let vid = 0;

let hooks = ["beforeMount", "mounted", "beforeDestroy", "destroyed"];

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
  if (this.options.$parent) {
    this.$parent = this.options.$parent;
  }
  this.$refs = {};
  this.components = this.options.components || [];
  this.template = this.options.template;
  this._buildingComponentAST = [];
  this._compIndex = 0;
  this.initProps();
  this.initSlots();
  this.initData();
  this.initMethods();
  this.ast = parseHTML(this.template.trim(), this);
  this.hooks = {};
};

proto.mount = function (el) {
  this.initSetUp();
  this._render = new Function('instance', `with(instance){return eval(${generate(this.ast[0])})}`);
  setupRenderEffect(this, el);
  if (!el) {
    return this.$el;
  }
  el = typeof el === "string" ? document.querySelector(el) : el;
  if (el instanceof HTMLElement) {
    el.appendChild(this.$el);
  }

  this.executeHooks("mounted");
  return this.$el;
};

proto._destroy = function () {
  this.executeHooks("beforeDestroy");
  this.isMounted = false;
  this.executeHooks("destroyed");
}


proto.initSetUp = function () {
  if (!this.options.setup || typeof this.options.setup !== "function") return;
  this.setup = this.options.setup;

  this.$state = this.setup.call(this, this.$props);
  proxify(this.$state, this);
}

proto.initProps = function () {
  this.$props = this.options.$props || {};
  Object.keys(this.$props).forEach(key => {
    this[key] = this.$props[key];
  });
}

proto.initSlots = function () {
  this.$slots = this.options.$slots || {};
}

proto.initData = function () {
  this.$data = (this.options.data || (this.options.data = () => ({})))();
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

proto.executeHooks = function (hookName) {
  if (this.hooks[hookName]) {
    this.hooks[hookName].forEach((hook) => {
      hook.call(this);
    });
  }
};

proto.addHooks = function (hookName, fn) {
  this.hooks[hookName] = this.hooks[hookName] || [];
  this.hooks[hookName].push(fn);
}

function proxify(obj, instance) {
  if (typeof obj !== "object" || !obj) return;

  Object.keys(obj).forEach(key => {
    Object.defineProperty(instance, key, {
      get() {
        return instance.$state[key];
      },
      set(value) {
        instance.$state[key] = value;
      }
    })
  })
}