import { ViewTrigger } from "../libs/view/view-trigger.js";
// import whatPage from "../libs/view/template/whatPage/what-page.js";
// import myInfo from "../libs/view/template/myInfo/myInfo.js";
// import whatList from "../libs/view/template/whatPage/whatList.js";
// import wanna from "../libs/view/template/wanna/wanna.js";
import auth from "../libs/view/template/auth/auth.js";
import login from "../libs/view/template/auth/login.js";
import regist from "../libs/view/template/auth/regist.js";
import RouterView from "../libs/view/route-view.js";
import View from "../libs/view/view.js";
import routeTest from "../libs/view/template/route-test/app.js";
import DetailView from "../libs/view/template/route-test/detail.js";
import DetailView2 from "../libs/view/template/route-test/detail2.js";
import createVnode from "../libs/view/compiler/create-vnode.js";
import Login from "../libs/view/components/Login.js";

export let whiteList = ["/auth/login", "/auth/regist", "/route-test", "/route-test/detail"];


let viewMap = {
  home: '/auth/login',
  map: [
    // {
    //   path: '/home',
    //   name: '首页',
    //   view: whatPage,
    //   children: [{
    //     path: 'whatList',
    //     name: '事项列表',
    //     view: whatList
    //   }, {
    //     path: 'myInfo',
    //     name: '关于我的',
    //     view: myInfo
    //   }, {
    //     path: 'wanna',
    //     name: '我的目标',
    //     view: wanna
    //   }]
    // },
    {
      path: "/auth",
      name: "认证",
      view: auth,
      children: [{
        path: 'login',
        name: '登录',
        view: login
      },
      {
        path: 'regist',
        name: '注册',
        view: regist
      }
      ]
    },
    {
      path: "/route-test",
      name: "路由测试",
      view: routeTest,
      children: [
        {
          path: "detail",
          name: "路由详情",
          view: DetailView,
        },
        {
          path: "info",
          name: "路由详情2",
          view: DetailView2,
        }
      ]
    }
  ]
}


let vt = new ViewTrigger({
  root: document.querySelector("#app")
}).route(viewMap);

vt.regist("beforeChildFlush", (route) => {
  document.title = route.name + "-WhatIWanna"
  // notify.success({
  //     title: "路由切换",
  //     msg: route.name
  // });
});

vt.beforeRoute((from, to, next, reject) => {
  next();
  // if (!vt.data.user && !whiteList.includes(to.path)) {
  //   reject("/auth/login");
  //   notify.warn("您尚未登录，请登陆后重试。")
  // } else {
  //   next();
  // }
});

vt.regist('afterFlush', () => {
  console.log(vt._matched, vm);
  vm.update();
});

View.usePlugin({
  install(View) {
    View.prototype.$router = vt;
  }
});

View.usePlugin(createVnode);

// `<div id="auth">
//   <div class="login">
//   <h3 v-for="item in list" v-bind:style="loginStyle">登录 {{item.name}}帐号</h3>
//   <div id="login" style="height: 1rem;margin: 1rem 0;" v-if="needLogin">__login-form__</div>
//   <template v-for="(item, index) in numbers">
//     <div v-bind:class="item" v-if="item%2 !== 0">
//       ({{index}})奇数: {{item}}
//     </div>
//     <div v-else-if="Math.random() > 0.5">
//       ({{index}})偶数: {{item}}
//     </div>
//     <div v-else>
//       我是else
//     </div>
//   </template>
//   <div class="static">static</div>
//   <div class="btn-wrap">
//     <button @click="handleLogin" class="btn btn-12 btn-success goLogin">{{state}}</button>
//     <button class="btn btn-12 btn-default goRegist">注册</button>
//   </div>
// </div>
// </div>`,


let authTemplate = `
<section class="auth">
  <Login ref="login" v-bind:title="loginProps">
    <div>
      <p style="margin-top: 10px" v-for="item in numbers">
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
  data() {
    return {
      list: [{ name: 'doctorwu' }, { name: 'yoqi' }],
      numbers: [1, 2, 3],
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
      console.log(this, this.list);
    },
  },
  // el: document.querySelector("#app"),
}).mount(document.querySelector("#app"));
// let ast = parseHTML(html)[0];
// console.log(ast);
// let _render = generate(ast);
console.log(view, view.$vnode, view.$el);

// const vm = new View({
//   el: document.querySelector("#app"),
//   template: "__APP__",
//   components: [{ name: "APP", component: routeTest }],
//   name: "app"
// });


window.vt = vt;
export default vt;
