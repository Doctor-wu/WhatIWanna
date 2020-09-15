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
    this.items = options.items || [];
    this.title = options.title;
}


VForm.prototype.loadItem = function() {
    this.items.forEach(item => {
        if (item instanceof VFormItem) new VFormItem(item.options).mount(this);
        else new VFormItem(item).mount(this);
    })
}

VForm.prototype.validate = function() {
    if (this.items.length === 0) return { state: 'success', info: [] };
    let arr = [];
    this.items.formEach((item) => {
        arr.push(item.validate());
    });
    let success = arr.all(item => {
        item.state = "success";
    });
    return success ? { state: 'success', info: arr } : { state: 'failed', info: arr };
}

VForm.prototype.mount = function(el) {
    if (!el) throw new Error("el is required in VForm");
    el = typeof el === "string" ? document.querySelector(el) : el;
    el.parentNode.insertBefore(this.el, el);
    el.parentNode.removeChild(el);
}