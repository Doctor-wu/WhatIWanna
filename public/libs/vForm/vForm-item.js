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
    this.valid = null;
    this.initEL();
    this.observe();
}

VFormItem.prototype.initEL = function() {
    this.id = itemId++;
    this.el = document.createElement("div");
    this.el.className = "vform-item";
    this.el.type = this.type;

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
    this.control = control;

    let msgBox = document.createElement("div");
    msgBox.className = "vform-item-msgbox"
    this.msgBox = msgBox;
    // msgBox.innerText = "测试数据"

    this.el.appendChild(label);
    this.el.appendChild(control);
    this.el.appendChild(msgBox);
}

VFormItem.prototype.mount = function(form) {
    utils.assert(form instanceof VForm, "VFormItem need mount to VForm");
    form.el.appendChild(this.el);
    this.initRules();
}

VFormItem.prototype.validate = function() {
    if (this.valid) return this.valid;
    // this.rules.every(rule => resolveRule(rule));
    return {
        state: "success",
        info: this.el
    }
}

VFormItem.prototype.initRules = function() {
    this.rules.forEach(item => {
        let validFunc = resolveRule.call(this, item);
        this.control.addEventListener(item.trigger || "blur", () => {
            let result = validFunc.call(this);
            if (!result.valid) {
                console.log(result);
                this.rejectValid(result.msg);
            } else {
                this.resolveValid();
            }
        });
    })
}

VFormItem.prototype.rejectValid = function(reason) {
    this.valid = {
        state: "failed",
        info: reason
    }
    this.msgBox.innerText = this.valid.info;
    this.el.classList.add("valid-fail");
}

VFormItem.prototype.resolveValid = function() {
    this.valid = {
        state: "success",
        info: "校验成功"
    }
    this.msgBox.innerText = "";
    this.el.classList.remove("valid-fail");
}

VFormItem.prototype.observe = function() {
    Object.defineProperty(this, "value", {
        get() {
            return this.control.value;
        },
        set(value) {
            this.control.value = value;
        }
    });
}


function resolveRule(rule) {
    var validFunc;
    if (rule.prop) {
        validFunc = function() {
            switch (rule.prop) {
                case "required":
                    {
                        if (!this.value) {
                            return {
                                valid: false,
                                msg: rule.msg || "验证失败"
                            };
                        } else {
                            return {
                                valid: true,
                                msg: "校验成功"
                            };
                        }
                        break
                    }
                default:
                    throw new Error(`Unknow Rule Name: ${rule.prop}`);
            }
        }
    } else if (rule.pattern) {
        validFunc = function() {
            let result = rule.pattern.test(this.value);
            if (result) {
                return {
                    valid: true,
                    msg: "校验成功"
                }
            } else {
                return {
                    valid: false,
                    msg: `未通过正则表达式验证:${rule.pattern}`
                }
            }
        }
    } else {
        throw new Error("rule need a name or pattern");
    }
    return validFunc;
}







function parseStyle(style) {
    if (!style) return "";
    let result = ``;
    Object.keys(style).forEach((prop) => {
        result += `${prop}:${style[prop]};`
    });
    return result;
}