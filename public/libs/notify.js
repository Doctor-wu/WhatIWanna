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



    Notify.success = function(msg) {
        let note = new Notify(Object.assign(notifyConfig, {
            type: "success",
            slot: {
                default: `<div class="notify">
                <span class="sign success"></span>
                <span class="msg">${msg}</span>
                <a href="javascript:;" class="close-notify">
                    <span class="iconfont icon-cuowu"></span>
                </a>
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
    }

    Notify.warn = function(msg) {
        return new Notify(Object.assign(notifyConfig, {
            type: "warn",
            slot: {
                default: `<div class="notify">
                <span class="sign warn"></span>
                <span class="msg">${msg}</span>
                <a href="javascript:;" class="close-notify">
                    <span class="iconfont icon-cuowu"></span>
                </a>
                </div>`
            },
            beforeMount() {
                console.log("beforeMount");
            },
            mounted() {
                console.log("mounted");
            },
            msg
        })).mount(".notify-list")
    }

    Notify.info = function(msg) {
        return new Notify(Object.assign(notifyConfig, {
            type: "info",
            slot: {
                default: `<div class="notify">
                <span class="sign info"></span>
                <span class="msg">${msg}</span>
                <a href="javascript:;" class="close-notify">
                    <span class="iconfont icon-cuowu"></span>
                </a>
                </div>`
            },
            beforeMount() {
                console.log("beforeMount");
                document.createElement("a").addEventListener
            },
            mounted() {},
            msg
        })).mount(".notify-list")
    }

    Notify.danger = function(msg) {
        return new Notify(Object.assign(notifyConfig, {
            type: "danger",
            slot: {
                default: `<div class="notify">
                <span class="sign danger"></span>
                <span class="msg">${msg}</span>
                <a href="javascript:;" class="close-notify">
                    <span class="iconfont icon-cuowu"></span>
                </a>
                </div>`
            },
            beforeMount() {
                console.log("beforeMount");
            },
            mounted() {
                console.log("mounted");
            },
            msg
        })).mount(".notify-list")
    }

    window.notify = Notify;
})(window)