"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var regist = {
  name: "regist",
  template: "<div class=\"login\">\n    <h3>\u6CE8\u518C</h3>\n    <div id=\"regist\" style=\"height: 6rem\"></div>\n    <div class=\".btn-wrap\">\n    <button class=\"btn btn-12 btn-success goRegist\">\u6CE8\u518C</button>\n    </div>\n    <div class=\"options\">\n        <a href=\"./#/auth/login\">\u5DF2\u6709\u8D26\u53F7?\u7ACB\u5373\u767B\u5F55</a>\n    </div>\n    </div>",
  plainScript: "\n    import { VFormItem } from \"./libs/vForm/vForm-item.js\";\n    import { VForm } from \"./libs/vForm/vForm.js\";\n    let user = new VFormItem({\n        tag: \"input\",\n        label: \"\u7528\u6237\u540D\",\n        key: \"user\",\n        attrs: {\n            placeholder: \"\u8BF7\u8F93\u5165\u7528\u6237\u540D\"\n        },\n        rules: [\n            { prop: \"required\", msg: \"\u8BF7\u8F93\u5165\u7528\u6237\u540D\", trigger: \"blur\" }\n        ]\n    });\n    \n    let pwd = new VFormItem({\n        tag: \"input\",\n        label: \"\u5BC6\u7801\",\n        key: \"pwd\",\n        attrs: {\n            type: \"password\",\n            placeholder: \"\u8BF7\u8F93\u5165\u5BC6\u7801\"\n        },\n        rules: [\n            { prop: \"required\", msg: \"\u8BF7\u8F93\u5165\u5BC6\u7801\", trigger: \"blur\" }\n        ]\n    });\n    \n    let casId = new VFormItem({\n        tag: \"input\",\n        label: \"\u5B66\u53F7\",\n        key: \"casId\",\n        attrs: {\n            type: \"input\",\n            placeholder: \"\u8BF7\u8F93\u5165\u5B66\u53F7\"\n        },\n        rules: [\n            { prop: \"required\", msg: \"\u8BF7\u8F93\u5165\u5B66\u53F7\", trigger: \"blur\" }\n        ]\n    });\n    \n    let vForm = new VForm({\n        title: \"\u767B\u5F55\",\n        items: [user, pwd, casId],\n        showBtn: false\n    }).mount(\"#regist\");\n    \n\n\n    let goRegist = document.querySelector(\".goRegist\");\n    \n    goRegist.addEventListener(\"click\", () => {\n        location.hash = \"/auth/login\";\n        notify.warn(\"\u6D4B\u8BD5\u8B66\u544A\");\n    })\n    "
};
regist = new _view["default"](regist);
var _default = regist;
exports["default"] = _default;