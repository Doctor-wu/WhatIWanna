import { VForm } from "../../vForm/vForm.js";
import { VFormItem } from "../../vForm/vForm-item.js";
import { reactive } from "../reactive/reactive.js";

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
    <h3 v-bind:style="middleStyle">{{stateTitle.value}}</h3>
      <button @click="$parent.addNumbers" class="btn btn-6 btn-success goLogin">加</button>
      <button @click="$parent.decreaseNumbers" class="btn btn-6 btn-default">减</button>

    <slot></slot>
    <div key="123" v-if="showForm.value" ref="form" id="login" style="height: 4rem">${dom.outerHTML}</div>
    <div class=".btn-wrap">
      <button @click="handleLogin" class="btn btn-12 btn-success goLogin">登录</button>
      <slot name="middle"></slot>
      <button @click="changeTitle" class="btn btn-12 btn-default goRegist">注册</button>
      <slot name="foot">
        <p>I am reserve foot slot;</p>
      </slot>
      <button @click="toggleForm" class="btn btn-12 btn-default goRegist">{{showForm.value ? '隐藏表格' : '显示表格'}}</button>
    </div>
  </div>
  `,
  setup() {
    const slotList = reactive([1, 2, 3]);
    const middleStyle = reactive({
      // color: "gold",
    });
    const showForm = reactive(true);
    const stateTitle = reactive("登录帐户");

    return {
      slotList,
      middleStyle,
      stateTitle,
      showForm,
    }
  },
  data() {
    return {
      state: "登录账号",
    };
  },
  methods: {
    handleLogin() {
      console.log(this);
      // notify.success(`I am inner Component; My name is ${this.name}`);
      // this.$parent.handleLogin();
      this.$parent.changeParentText();
    },
    changeTitle() {
      notify.success("I am child log");
      this.emit('log');
      // this.$state.stateTitle.value = "I changed too";
      // this.$state.middleStyle.color = "blue";
    },
    toggleForm() {
      this.showForm.value = !this.showForm.value;
    }
  },
};

export default Login;