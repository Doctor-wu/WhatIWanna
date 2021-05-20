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
    <slot></slot>
    <div v-if="showForm.value" ref="form" id="login" style="height: 4rem">${dom.outerHTML}</div>
    <slot name="middle"></slot>
    <div class=".btn-wrap">
      <button @click="handleLogin" class="btn btn-12 btn-success goLogin">登录</button>
      <button @click="changeTitle" class="btn btn-12 btn-default goRegist">注册</button>
      <button @click="toggleForm" class="btn btn-12 btn-default goRegist">{{showForm.value ? '隐藏表格' : '显示表格'}}</button>
    </div>
    <slot name="foot">
      <p>I am reserve foot slot;</p>
    </slot>
  </div>
  `,
  setup() {
    const slotList = reactive([1,2,3]);
    const middleStyle = reactive({
      color: "gold",
    }) ;
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
      notify.success(`I am inner Component; My name is ${this.name}`);
      this.$parent.handleLogin();
    },
    changeTitle() {
        this.$state.stateTitle.value = "123";
        this.$state.middleStyle.color = "blue";
        console.log(this.$state);
    },
    toggleForm() {
        this.showForm.value = !this.showForm.value;
    }
  },
};

export default Login;