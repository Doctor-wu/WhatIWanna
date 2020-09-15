import { VFormItem } from './vForm-item.js';
import { utils } from '../../js/utils/utils.js';
export function VForm(options = {}) {
    if (!this instanceof VForm) {
        return new VForm(options);
    }

    this.init(options);
    this.loadItem();
}


VForm.prototype.init = function(options) {
    this.el = options.el || document.createElement("form");
    this.el.className = "vform";
    this.items = options.items || [];
    this.title = options.title;
    this.submit = new Promise((resolve, reject) => {
        this.submitTrigger = resolve;
        this.submitReject = reject;
    }).catch(e => {
        console.warn("[valid fail]", e);
    });

}


VForm.prototype.loadItem = function() {
    if (this.items.length <= 0) return;
    this.items.forEach(item => {
        if (item instanceof VFormItem) new VFormItem(item.options).mount(this);
        else new VFormItem(item).mount(this);
    });
    this.initBtn();
}

VForm.prototype.validate = function() {
    if (this.items.length === 0) return { state: 'success', info: [] };
    let arr = [];
    this.items.forEach((item) => {
        arr.push(item.validate());
    });
    let success = arr.every(item => {
        return item.state === "success";
    });
    return success ? { state: 'success', info: arr } : { state: 'failed', info: arr };
}

VForm.prototype.mount = function(el) {
    if (!el) throw new Error("el is required in VForm");
    el = typeof el === "string" ? document.querySelector(el) : el;
    el.parentNode.insertBefore(this.el, el);
    el.parentNode.removeChild(el);
}

VForm.prototype.initBtn = function() {
    let btnGrp = document.createElement("div");
    btnGrp.className = "btn-wrap";
    this.resetEL = document.createElement("button");
    this.resetEL.className = "btn btn-6 btn-default";
    this.resetEL.type = "reset";
    this.resetEL.innerHTML = "重置";
    this.submitEL = document.createElement("button");
    this.submitEL.className = "btn btn-6 btn-success";
    this.submitEL.type = "submit";
    this.submitEL.innerHTML = "提交";
    resolveSubmit.call(this);
    btnGrp.appendChild(this.resetEL);
    btnGrp.appendChild(this.submitEL);
    this.el.appendChild(btnGrp);
}



function resolveSubmit() {
    this.submitEL.addEventListener("click", (ev) => {
        ev.preventDefault();
        let valid = this.validate();
        if (valid.state === "success") this.submitTrigger(valid);
        else this.submitReject(valid);
    })
}