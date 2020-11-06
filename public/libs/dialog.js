import { Pipe } from "./Pipe.js";

export default function Dialog(options) {
  Pipe.call(this);
  this.options = Object.assign(
    {
      showBtn: true,
    },
    options
  );
  this.init();
}

Dialog.prototype = Object.create(Pipe.prototype);
let proto = Dialog.prototype;
proto.constructor = Dialog;

proto.init = function () {
  this.title = this.options.title || "提示";
  this.msg = this.options.msg;
  this.confirmTxt = this.options.confirmTxt;
  this.cancelTxt = this.options.cancelTxt;
  this.msg = this.options.msg;
  this.initEl();
};

proto.initEl = function () {
  this.elStr = `
     <div class="dialog-title">
        <div class="title-msg">${this.title}</div>
        <span class="iconfont icon-cuowu2"></span>
    </div>
    <div class="dialog-msg">${this.msg}</div>
    <div class="dialog-btn-wrap clearfix">
    <button class="btn btn-primary btn-6 dialog-confirm">确认</button>
        <button class="btn btn-default btn-6 dialog-cancel">取消</button>
    </div>
    `;
  this.wrapEL = document.createElement("div");
  this.maskEl = document.createElement("div");
  this.maskEl.classList.add("dialog-mask");
  this.wrapEL.innerHTML = this.elStr;
  this.wrapEL.classList.add("dialog-wrap");
  this.closeEl = this.wrapEL.querySelector(".iconfont");
  this.cancelEl = this.wrapEL.querySelector(".dialog-cancel");
  this.confirmEl = this.wrapEL.querySelector(".dialog-confirm");

  this.closeEl.addEventListener("click", (ev) => {
    ev.stopPropagation();
    this.destroy();
  });
  this.cancelEl.addEventListener("click", (ev) => {
    ev.stopPropagation();
    this.emit("cancel", this);
  });
  this.confirmEl.addEventListener("click", (ev) => {
    ev.stopPropagation();
    this.emit("confirm", this);
  });

  this.regist("cancel", () => {
    this.destroy();
  });

  this.emit("beforeMount", this);
  document.body.appendChild(this.maskEl);
  document.body.appendChild(this.wrapEL);

  this.wrapEL.offsetHeight; // 触发回流
  this.wrapEL.style.opacity = 1;
  this.maskEl.style.opacity = 1;
  this.emit("mounted", this);
};

proto.destroy = function () {
  let result = this.emit("beforeDestroy", this);
  Promise.all(result)
    .then((res) => {
      this.wrapEL.style.opacity = 0;
      this.maskEl.style.opacity = 0;
      setTimeout(() => {
        document.body.removeChild(this.wrapEL);
        document.body.removeChild(this.maskEl);
        this.wrapEL = null;
        this.maskEl = null;
        this.emit("destroyed", this);
      }, 300);
    })
    .catch((e) => {
      console.log(e);
    });
};

proto.cancel = function () {
  this.destroy();
};
