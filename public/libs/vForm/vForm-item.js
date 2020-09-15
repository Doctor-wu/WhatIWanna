import { utils } from '../../js/utils/utils.js';
import { VForm } from './vForm.js';
export function VFormItem(options = {}) {
    if (!this instanceof VFormItem) {
        return new VFormItem(options);
    }

    this.init(options);
}

let itemId = 0;


/**
 * t
 * @author Doctorwu
 * @date 2020-09-15
 * @param options
 *  tag
 *  type
 *  rules
 *  label
 * @returns {VFormItem}
 */
VFormItem.prototype.init = function(options) {
    // utils.assert(options.tag, "VFormItem need a tag");
    Object.assign(this, {
        type: "text",
        rules: []
    }, options);
    this.options = options;
    this.initEL();
}

VFormItem.prototype.initEL = function() {
    this.id = itemId++;
    this.el = document.createElement("div");
    this.el.className = "vform-item";

    let label = document.createElement("label");
    label.className = "vform-item-label";
    label.setAttribute("for", `item${this.id}`);
    label.style = "display: block;width: 100%;"
    label.innerText = this.label;

    let control = document.createElement(this.tag);
    control.className = "vform-item-control";
    control.id = `item${this.id}`;
    control.setAttribute("required", true);
    Object.assign(control, this.options.attrs || {});
    control.setAttribute("style", parseStyle(this.options.style));
    console.log(control);

    let msgBox = document.createElement("div");
    msgBox.className = "vform-item-msgbox"
        // msgBox.innerText = "测试数据"

    this.el.appendChild(label);
    this.el.appendChild(control);
    this.el.appendChild(msgBox);
}

VFormItem.prototype.mount = function(form) {
    utils.assert(form instanceof VForm, "VFormItem need mount to VForm");
    form.el.appendChild(this.el);
}



function parseStyle(style) {
    if (!style) return "";
    let result = ``;
    Object.keys(style).forEach((prop) => {
        result += `${prop}:${style[prop]};`
    });
    return result;
}