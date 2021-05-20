import { VForm } from "../../vForm/vForm.js";
import { VFormItem } from "../../vForm/vForm-item.js";

let user = new VFormItem({
  tag: "input",
  label: "用户名",
  key: "casId",
  attrs: {
    placeholder: "请输入用户名[学号]",
    autocomplete: "username"
  },
  rules: [
    { prop: "required", msg: "请输入用户名[学号]", trigger: "blur" },
    { pattern: /^\d{12}$/, msg: "请输入正用户名[学号]", trigger: "input" }
  ]
});

let pwd = new VFormItem({
  tag: "input",
  label: "密码",
  key: "password",
  attrs: {
    type: "password",
    placeholder: "请输入密码",
    autocomplete: "current-password"
  },
  rules: [
    { prop: "required", msg: "请输入密码", trigger: "blur" }
  ]
});

let vForm = new VForm({
  title: "登录",
  items: [user, pwd],
  showBtn: false
});
let dom = vForm.mount("#login");

let Login = {
  name: "Login",
  template: `
  <div class="login">
    <h3>{{title}}</h3>
    <slot></slot>
    <div ref="form" id="login" style="height: 4rem">${dom.outerHTML}</div>
    <slot name="middle"></slot>
    <div class=".btn-wrap">
      <button @click="handleLogin" class="btn btn-12 btn-success goLogin">登录</button>
      <button class="btn btn-12 btn-default goRegist">注册</button>
    </div>
    <slot name="foot">
      <p style="color: red;">I am reserve foot slot;</p>
    </slot>
  </div>
  `,
  data() {
    return {
      state: "登录账号",
    };
  },
  methods: {
    handleLogin() {
      console.log(this);
      notify.success(`I am inner Component; My name is ${this.name}`);
      this.$parent.handleLogin();
    },
  },
};

export default Login;