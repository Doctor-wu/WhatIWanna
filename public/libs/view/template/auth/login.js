import View from "../../view.js";
// import {VFormItem} from "./libs/vForm/vForm-item.js";
// import vt from "../../../../js/index.js";
import { VFormItem } from "../../../vForm/vForm-item.js";
import { VForm } from "../../../vForm/vForm.js";

let login = {
  name: "login",
  template: `<div class="login">
    <h3>登录帐号</h3>
    <div id="login" style="height: 4rem">__login-form__</div>
    <div class=".btn-wrap">
    <button class="btn btn-12 btn-success goLogin">登录</button>
    <button class="btn btn-12 btn-default goRegist">注册</button>
    </div>
    </div>`,
  slot: {
    "login-form": function () {
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
      this.vForm = vForm;
      return vForm.mount("#login").outerHTML;
    }
  },
  mounted() {
    if (!this.$router.data.isLogin) {
      console.log(this);
      (function () {
        // let goLogin = this.el.querySelector(".goLogin");
        // let goRegist = this.el.querySelector(".goRegist");
        console.log(this.vForm);
        // this.vForm.mountBtn(goLogin);

        this.vForm.regist("submit", ({ valid, data }) => {
          axios.post("./login", data)
            .then(res => {
              if (res.data.code !== 1) {
                notify.warn({
                  title: "oops!",
                  msg: res.data.msg
                });
              } else {
                this.$router.data.user = res.data.data;
                sessionStorage.setItem("user", JSON.stringify(this.$router.data.user));
                notify.success(`登录成功😀<br/>欢迎你, [${this.$router.data.user["username"]}] `);
                location.hash = "/home/whatList";
              }
            });
        });

        // goRegist.addEventListener("click", () => {
        //   location.hash = "/auth/regist";
        // })
      }).call(this)
    }
  }
};


login = View.extend(login);


export default login;
