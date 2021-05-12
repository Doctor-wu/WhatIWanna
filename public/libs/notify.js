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
    this.hooks.mounted = [function () {
        this.el.firstElementChild.querySelector(".close-notify")
            .addEventListener("click", this.destroy.bind(this), false);
    }];


    this.options.beforeMount && this.hooks.beforeMount.push(this.options.beforeMount);
    this.options.mounted && this.hooks.mounted.push(this.options.mounted);
}

proto.destroy = function () {
    if (!this.destroyed) {
        this.el.classList.add("notify-leave");
        setTimeout(() => {
            this.el.parentNode.removeChild(this.el);
            this.el = null;
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
                        <span class="sign __theme__ iconfont __tipIcon__"></span>
                        <h3 class="title">__slot-title__</h3>
                    </div>
                    <a href="javascript:;" class="close-notify">
                        <span class="iconfont icon-cuowu"></span>
                    </a>
                </div>
                <div class="info">
                    <span class="msg">__slot__</span>
                </div>
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



    Notify.success = function (options) {
        let msg = typeof options === "object" ? options.msg : options;
        let title = typeof options === "object" ? options.title || "成功" : "成功";
        let note = new Notify(Object.assign(notifyConfig, {
            type: "success",
            slot: {
                default: msg,
                "slot-title": title,
                tipIcon: "icon-dui",
                theme: "success",
            },
            msg
        })).mount(".notify-list");
        // new Drag(note.el, {
        //     limitYT: 2,
        //     limitYB: 2
        // });
        return note;
    }

    Notify.warn = function (options) {
        let msg = typeof options === "object" ? options.msg : options;
        let title = typeof options === "object" ? options.title || "警告" : "警告";
        let note = new Notify(Object.assign(notifyConfig, {
            type: "warn",
            slot: {
                default: msg,
                "slot-title": title,
                tipIcon: "icon-cuowu1",
                theme: "warn",
            },
            msg
        })).mount(".notify-list");
        return note;
    }

    Notify.info = function (options) {
        let msg = typeof options === "object" ? options.msg : options;
        let title = typeof options === "object" ? options.title || "消息" : "消息";
        let note = new Notify(Object.assign(notifyConfig, {
            type: "info",
            slot: {
                default: msg,
                "slot-title": title,
                tipIcon: "icon-info1",
                theme: "info",
            },
            msg
        })).mount(".notify-list");
        return note;
    }

    Notify.danger = function (options) {
        let msg = typeof options === "object" ? options.msg : options;
        let title = typeof options === "object" ? options.title || "失败" : "失败";
        let note = new Notify(Object.assign(notifyConfig, {
            type: "danger",
            slot: {
                default: msg,
                "slot-title": title,
                tipIcon: "icon-cuowu2",
                theme: "danger",
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
