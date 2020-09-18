import { utils } from "../js/utils/utils.js";
import View from "./view/view.js";
import { Drag } from "../js/utils/drag.js";



function Notify(options) {
    if (!this instanceof Notify) {
        return new Notify(options);
    }
    View.call(this, options);
    this.hooks.beforeMount = options.beforeMount;
    this.hooks.mounted = options.mounted;
}
let proto = Notify.prototype = Object.create(View.prototype);
proto.constructor = Notify;

proto.destroy = function() {
    this.el.classList.add("notify-leave");
    setTimeout(() => {
        this.el.parentNode.removeChild(this.el);
    }, 300)
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
                        <span class="sign success"></span>
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
            beforeMount() {
                console.log("beforeMount");
                setTimeout(() => {
                    this.destroy();
                }, 3000)
            },
            mounted() {
                console.log(this.el.firstElementChild)
                this.el.firstElementChild.querySelector(".close-notify")
                    .addEventListener("click", this.destroy.bind(this), false);
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
                        <span class="sign warn"></span>
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
            beforeMount() {
                console.log("beforeMount");
                setTimeout(() => {
                    this.destroy();
                }, 3000)
            },
            mounted() {
                console.log(this.el.firstElementChild)
                this.el.firstElementChild.querySelector(".close-notify")
                    .addEventListener("click", this.destroy.bind(this), false);
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
                        <span class="sign info"></span>
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
            beforeMount() {
                console.log("beforeMount");
                setTimeout(() => {
                    this.destroy();
                }, 3000)
            },
            mounted() {
                console.log(this.el.firstElementChild)
                this.el.firstElementChild.querySelector(".close-notify")
                    .addEventListener("click", this.destroy.bind(this), false);
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
                        <span class="sign danger"></span>
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
            beforeMount() {
                console.log("beforeMount");
                setTimeout(() => {
                    this.destroy();
                }, 3000)
            },
            mounted() {
                console.log(this.el.firstElementChild)
                this.el.firstElementChild.querySelector(".close-notify")
                    .addEventListener("click", this.destroy.bind(this), false);
            },
            msg
        })).mount(".notify-list");
        return note;
    }

    window.notify = Notify;
})(window)