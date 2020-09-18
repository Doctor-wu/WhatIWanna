"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _view = _interopRequireDefault(require("../../view.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var login = {
  name: "login",
  template: "<div class=\"login\">\n    <h3>\u767B\u5F55</h3>\n    <div id=\"login\" style=\"height: 4rem\"></div>\n    <div class=\".btn-wrap\">\n    <button class=\"btn btn-12 btn-success goLogin\">\u767B\u5F55</button>\n    <button class=\"btn btn-12 btn-default goRegist\">\u6CE8\u518C</button>\n    </div>\n    </div>",
  plainScript: "\n    import { VFormItem } from \"./libs/vForm/vForm-item.js\";\n    import { VForm } from \"./libs/vForm/vForm.js\";\n    let user = new VFormItem({\n        tag: \"input\",\n        label: \"\u7528\u6237\u540D\",\n        key: \"user\",\n        attrs: {\n            placeholder: \"\u8BF7\u8F93\u5165\u7528\u6237\u540D\",\n            autocomplete: \"username\"\n        },\n        rules: [\n            { prop: \"required\", msg: \"\u8BF7\u8F93\u5165\u7528\u6237\u540D\", trigger: \"blur\" }\n        ]\n    });\n    \n    let pwd = new VFormItem({\n        tag: \"input\",\n        label: \"\u5BC6\u7801\",\n        key: \"pwd\",\n        attrs: {\n            type: \"password\",\n            placeholder: \"\u8BF7\u8F93\u5165\u5BC6\u7801\",\n            autocomplete: \"current-password\"\n        },\n        rules: [\n            { prop: \"required\", msg: \"\u8BF7\u8F93\u5165\u5BC6\u7801\", trigger: \"blur\" }\n        ]\n    });\n    \n    let vForm = new VForm({\n        title: \"\u767B\u5F55\",\n        items: [user, pwd],\n        showBtn: false\n    }).mount(\"#login\");\n    \n\n\n    let goLogin = document.querySelector(\".goLogin\");\n    let goRegist = document.querySelector(\".goRegist\");\n    \n    goLogin.addEventListener(\"click\", () => {\n        location.hash = \"/home/whatList\";\n        notify.success(\"\u767B\u9646\u6210\u529F\uD83D\uDE00\");\n    })\n    goRegist.addEventListener(\"click\", () => {\n        location.hash = \"/auth/regist\";\n        notify.success(\"\u524D\u5F80\u6CE8\u518C\");\n    })\n    "
};
login = new _view["default"](login);
var _default = login;
exports["default"] = _default;