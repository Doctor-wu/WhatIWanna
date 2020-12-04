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


proto.initHooks = function() {
    this.hooks.beforeMount = [function() {
        setTimeout(() => {
            this.destroy();
        }, 3000)
    }];
    this.hooks.mounted = [function() {
        this.el.firstElementChild.querySelector(".close-notify")
            .addEventListener("click", this.destroy.bind(this), false);
    }];


    this.options.beforeMount && this.hooks.beforeMount.push(this.options.beforeMount);
    this.options.mounted && this.hooks.mounted.push(this.options.mounted);
}

proto.destroy = function() {
    if (!this.destroyed) {
        this.el.classList.add("notify-leave");
        setTimeout(() => {
            this.el.parentNode.removeChild(this.el);
            this.el = null;
            this.destroyed = true;
        }, 300)
    }
};





(function(window) {
    utils.assert(utils.isWindow(window) && typeof window.document === "object", "notify need a window with document");
    // let notify = Object.create(null);

    let notifyConfig = {
        template: `
            <div class="msg">
                __slot__
            </div>
        `,
        type: "success",
        name: "notify",
        slot: {
            default: "<div>notify</div>"
        },
        renderType: "append",
        msg: ""
    }



    Notify.success = function(options) {
        let msg = typeof options === "object" ? options.msg : options;
        let title = typeof options === "object" ? options.title || "成功" : "成功";
        let note = new Notify(Object.assign(notifyConfig, {
            type: "success",
            slot: {
                default: `<div class="notify">
                <div class="operation">
                    <div class="title-wrap">
                        <span class="sign success iconfont icon-dui"></span>
                        <h3 class="title">${title}</h3>
                    </div>
                    <a href="javascript:;" class="close-notify">
                        <span class="iconfont icon-cuowu"></span>
                    </a>
                </div>
                <div class="info">
                    <span class="msg">${msg}</span>
                </div>
                </div>`
            },
            msg
        })).mount(".notify-list");
        // new Drag(note.el, {
        //     limitYT: 2,
        //     limitYB: 2
        // });
        return note;
    }

    Notify.warn = function(options) {
        let msg = typeof options === "object" ? options.msg : options;
        let title = typeof options === "object" ? options.title || "警告" : "警告";
        let note = new Notify(Object.assign(notifyConfig, {
            type: "warn",
            slot: {
                default: `<div class="notify">
                <div class="operation">
                    <div class="title-wrap">
                        <span class="sign warn iconfont icon-cuowu1"></span>
                        <h3 class="title">${title}</h3>
                    </div>
                    <a href="javascript:;" class="close-notify">
                        <span class="iconfont icon-cuowu"></span>
                    </a>
                </div>
                <div class="info">
                    <span class="msg">${msg}</span>
                </div>
                </div>`
            },
            msg
        })).mount(".notify-list");
        return note;
    }

    Notify.info = function(options) {
        let msg = typeof options === "object" ? options.msg : options;
        let title = typeof options === "object" ? options.title || "消息" : "消息";
        let note = new Notify(Object.assign(notifyConfig, {
            type: "info",
            slot: {
                default: `<div class="notify">
                <div class="operation">
                    <div class="title-wrap">
                        <span class="sign info iconfont icon-info1"></span>
                        <h3 class="title">${title}</h3>
                    </div>
                    <a href="javascript:;" class="close-notify">
                        <span class="iconfont icon-cuowu"></span>
                    </a>
                </div>
                <div class="info">
                    <span class="msg">${msg}</span>
                </div>
                </div>`
            },
            msg
        })).mount(".notify-list");
        return note;
    }

    Notify.danger = function(options) {
        let msg = typeof options === "object" ? options.msg : options;
        let title = typeof options === "object" ? options.title || "失败" : "失败";
        let note = new Notify(Object.assign(notifyConfig, {
            type: "danger",
            slot: {
                default: `<div class="notify">
                <div class="operation">
                    <div class="title-wrap">
                        <span class="sign danger iconfont icon-cuowu2"></span>
                        <h3 class="title">${title}</h3>
                    </div>
                    <a href="javascript:;" class="close-notify">
                        <span class="iconfont icon-cuowu"></span>
                    </a>
                </div>
                <div class="info">
                    <span class="msg">${msg}</span>
                </div>
                </div>`
            },
            msg
        })).mount(".notify-list");
        return note;
    }
    let oldNotify = window.notify;
    Notify.noConflict = function () {
        window.notify = oldNotify;
        return Notify;
    }
    window.notify = Notify;
})(window)
