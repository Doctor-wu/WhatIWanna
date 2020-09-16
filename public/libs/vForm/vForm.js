import { VFormItem } from './vForm-item.js';
import { Pipe } from './Pipe.js';
import { utils } from '../../js/utils/utils.js';
export function VForm(options = {}) {
    if (!this instanceof VForm) {
        return new VForm(options);
    }
    Pipe.call(this);

    this.init(options);
    this.loadItem();
}
VForm.prototype = Object.create(Pipe.prototype);

let proto = VForm.prototype;

Object.defineProperty(proto, "constructor", {
    enumerable: false,
    value: VForm
})



VForm.prototype.init = function(options) {
    this.el = options.el || document.createElement("form");
    this.el.className = "vform";
    this.items = options.items || [];
    this.title = options.title;
    this.showBtn = options.showBtn || true;
    this.submit = new Promise((resolve, reject) => {
        this.submitTrigger = resolve;
    }).catch(e => {
        console.warn("[valid fail]", e);
    });

}


VForm.prototype.loadItem = function() {
    if (this.items.length <= 0) return;
    this.items = this.items.map(item => {
        if (item instanceof VFormItem) return new VFormItem(item.options).mount(this);
        else return new VFormItem(item).mount(this);
    });
    this.showBtn && this.initBtn();
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
    if (success) {
        return { state: 'success', info: arr }
    } else {
        return { state: 'failed', info: arr }
    }
}

VForm.prototype.mount = function(el) {
    if (!el) throw new Error("el is required in VForm");
    el = typeof el === "string" ? document.querySelector(el) : el;
    el.parentNode.insertBefore(this.el, el);
    el.parentNode.removeChild(el);
    return this;
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
        if (valid.state === "success") {
            let data = {};
            this.items.forEach(item => {
                data[item.key] = item.value
            });
            this.emit("submit", { valid: valid, data });
        } else {
            console.warn(`[valid failed] ${JSON.stringify(valid)}`);
        };
    })
}