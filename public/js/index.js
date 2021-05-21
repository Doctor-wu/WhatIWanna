import View from "../libs/view/view.js";
import createVnode from "../libs/view/compiler/create-vnode.js";
import Login from "../libs/view/components/Login.js";
import { reactive } from "../libs/view/reactive/reactive.js";

View.usePlugin(createVnode);

let authTemplate = `
<section class="auth">
  <Login v-if="true" @log="parentLog" ref="login" v-bind:title="loginProps">
    <div>
      <p ref="slot-list" style="margin-top: 10px" v-for="item in numbers">
        {{item}}) I am default slot;
      </p>
    </div>
    <template v-slot:middle>
      <p>
        I am middle slot;
      </p>
    </template>
  </Login>
  <ul ref="ulElement" class="left">
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <ul class="right">
    <li></li>
    <li></li>
    <li></li>
  </ul>
</section>`;

let view = new View({
  name: "vm",
  template: authTemplate,
  components: [Login],
  setup() {
    const parentText = reactive("I am parent");
    const numbers = reactive([1, 2, 3]);

    return {
      parentText,
      numbers,
    }
  },
  data() {
    return {
      list: [{
        name: 'doctorwu'
      }, {
        name: 'yoqi'
      }],
      hoistLayer: {
        position: "relative",
        zIndex: 1
      },
      state: "登录账号",
      needLogin: true,
      loginProps: "登录账号",
      loginStyle: {
        color: 'red'
      },
      btnWrap: "dynamic"
    };
  },
  methods: {
    handleLogin() {
      notify.success(`I am outside Component; My name is ${this.name}`);
      console.log(this);
    },
    changeParentText() {
      this.parentText.value = "But I changed";
      this.numbers.push(this.numbers.length + 1);
    },
    parentLog() {
      notify.success("I am parent log");
    },
    addNumbers() {
      this.numbers.push(this.numbers.length + 1);
    },
    decreaseNumbers() {
      this.numbers.pop();
    },
  },
  // el: document.querySelector("#app"),
});
view.mount(document.querySelector("#app"));

console.log(view, view.$vnode, view.$el);

export default view;