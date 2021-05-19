import { utils } from "../js/utils/utils.js";
import View from "./view/view.js";
import { Drag } from "../js/utils/drag.js";



function Notify(options) {
  if (!this instanceof Notify) {
    return new Notify(options);
  }
  View.call(this, options);
  this.options = options;
  this.initHooks();
}
let proto = Notify.prototype = Object.create(View.prototype);
proto.constructor = Notify;


proto.initHooks = function () {
  this.hooks.beforeMount = [function () {
    setTimeout(() => {
      this.destroy();
    }, 3000)
  }];

  this.options.beforeMount && this.hooks.beforeMount.push(this.options.beforeMount);
}

proto.destroy = function () {
  if (!this.destroyed) {
    this.$el.classList.add("notify-leave");
    setTimeout(() => {
      this.$el.parentNode.removeChild(this.$el);
      this.$el = null;
      this.destroyed = true;
    }, 300)
  }
};





(function (window) {
  utils.assert(utils.isWindow(window) && typeof window.document === "object", "notify need a window with document");
  // let notify = Object.create(null);

  let notifyConfig = {
    template: `
    <div class="notify">
        <div class="operation">
            <div class="title-wrap">
                <span v-bind:class="className"></span>
                <h3 class="title">{{title}}</h3>
            </div>
            <a @click="close" href="javascript:;" class="close-notify">
                <span class="iconfont icon-cuowu"></span>
            </a>
        </div>
        <div class="info">
            <span class="msg">{{msg}}</span>
        </div>
    </div>
`,
    name: "notify",
    methods: {
      close() {
        this.destroy();
      }
    }
  }


  let mountNotify = function (...args) {
    return mountNotify.info(...args);
  }

  mountNotify.success = function (options) {
    let msg = (typeof options === "object" ? options.msg : options) || "";
    let title = typeof options === "object" ? options.title || "成功" : "成功";
    let note = new Notify(Object.assign(notifyConfig, {
      data() {
        return {
          className: "sign success iconfont icon-dui",
          msg,
          title,
        }
      }
    })).mount(".notify-list");
    // new Drag(note.el, {
    //     limitYT: 2,
    //     limitYB: 2
    // });
    return note;
  }

  mountNotify.warn = function (options) {
    let msg = (typeof options === "object" ? options.msg : options) || "";
    let title = typeof options === "object" ? options.title || "警告" : "警告";
    let note = new Notify(Object.assign(notifyConfig, {
      data() {
        return {
          className: "sign warn iconfont icon-cuowu1",
          msg,
          title,
        }
      }
    })).mount(".notify-list");
    return note;
  }

  mountNotify.info = function (options) {
    let msg = (typeof options === "object" ? options.msg : options) || "";
    let title = typeof options === "object" ? options.title || "消息" : "消息";
    let note = new Notify(Object.assign(notifyConfig, {
      data() {
        return {
          className: "sign info iconfont icon-info1",
          msg,
          title,
        }
      }
    })).mount(".notify-list");
    return note;
  }

  mountNotify.danger = function (options) {
    let msg = (typeof options === "object" ? options.msg : options) || "";
    let title = typeof options === "object" ? options.title || "失败" : "失败";
    let note = new Notify(Object.assign(notifyConfig, {
      data() {
        return {
          className: "sign danger iconfont icon-cuowu2",
          msg,
          title,
        }
      }
    })).mount(".notify-list");
    return note;
  }
  let oldNotify = window.notify;
  mountNotify.noConflict = function () {
    window.notify = oldNotify;
    return mountNotify;
  }
  window.notify = mountNotify;
})(window)
