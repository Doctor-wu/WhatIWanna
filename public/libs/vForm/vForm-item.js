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
    this.el.style = this.style;

    let label
    if (this.label) {
        label = document.createElement("label");
        label.className = "vform-item-label";
        label.setAttribute("for", `item${this.id}`);
        label.style = "display: block;width: 100%;"
        label.innerText = this.label;
    }

    this.buildControl();

    let msgBox = document.createElement("div");
    msgBox.className = "vform-item-msgbox"
    this.msgBox = msgBox;

    label && this.el.appendChild(label);
    this.el.appendChild(this.control);
    this.el.appendChild(this.msgBox);
}

// 可在这个方法扩展表单控件
VFormItem.prototype.buildControl = function() {
    let control = document.createElement(this.tag);

    if (this.tag === "select") {
        utils.assert(this.opts, "select need some options");
        for (const key in this.opts) {
            if (this.opts.hasOwnProperty(key)) {
                let el = document.createElement("option");
                el.innerText = key;
                el.value = this.opts[key];
                el.style.background = this.options[key];
                el.style.padding = ".1rem 0"
                control.appendChild(el);
                control.value = null;
            }
        }

        // 重写observe 以解决多选的value无法是多个option值的问题
        let _this = this;
        this.observe = function() {
            Object.defineProperty(this, "value", {
                get() {
                    let arr = [];
                    [].forEach.call(_this.control.selectedOptions, option => {
                        arr.push(option.value);
                    });
                    return arr.toString();
                },
                set(value) {
                    _this.control.value = value;
                }
            })
        }
    }

    control.className = "vform-item-control";
    control.id = `item${this.id}`;
    // 此属性不做校验，仅作为表单控件的伸缩条件
    control.setAttribute("required", true);
    for (const key in this.options.attrs) {
        if (this.options.attrs.hasOwnProperty(key)) {
            control.setAttribute(key, this.options.attrs[key]);
        }
    }
    control.setAttribute("style", parseStyle(this.options.style));
    this.control = control;
}

// 挂载到VForm上
VFormItem.prototype.mount = function(form) {
    utils.assert(form instanceof VForm, "VFormItem need mount to VForm");
    form.el.appendChild(this.el);
    this.initRules();
    return this
}

// 独立的验证模块
VFormItem.prototype.validate = function() {
    if (this.rules.length === 0) { return { state: "success", info: [] } };
    this.rules.map(rule => resolveRule(rule).call(this)).forEach(item => {
        if (!item.valid) {
            this.rejectValid(item.msg);
        }
    });
    if (!this.valid) {
        this.resolveValid();
    }
    return this.valid;
}

// 初始化规则，将相应规则的事件绑定上
VFormItem.prototype.initRules = function() {
    this.rules.forEach(item => {
        let validFunc = resolveRule.call(this, item);
        this.control.addEventListener(item.trigger || "blur", () => {
            let result = validFunc.call(this);
            if (!result.valid) {
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
    this.msgBox.innerText = reason;
    this.el.classList.add("valid-fail");
}

VFormItem.prototype.resolveValid = function() {
    this.valid = {
        state: "success",
        info: "校验成功",
        key: this.key,
        value: this.value
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