import View from "../libs/view/view.js";
import createVnode from "../libs/view/compiler/create-vnode.js";
import Login from "../libs/view/components/Login.js";
import { reactive } from "../libs/view/reactive/reactive.js";

View.usePlugin(createVnode);

let authTemplate = `
<section class="auth">
  <p>{{parentText.value}}</p>
  <p>{{numbers}}</p>
  <Login v-if="false" ref="login" v-bind:title="loginProps"/>
  <Login v-if="true" ref="login" v-bind:title="loginProps">
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
    }
  },
  // el: document.querySelector("#app"),
});
view.mount(document.querySelector("#app"));

console.log(view, view.$vnode, view.$el);

export default view;