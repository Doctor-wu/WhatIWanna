import View from "../../view.js";

let regist = {
    name: "regist",
    template: `<div class="login">
    <h3>注册</h3>
    <div id="regist" style="height: 6rem"></div>
    <div class=".btn-wrap">
    <button class="btn btn-12 btn-success goRegist">注册</button>
    </div>
    <div class="options">
        <a href="/#/auth/login">已有账号?立即登录</a>
    </div>
    </div>`,
    plainScript: `
    import { VFormItem } from "./libs/vForm/vForm-item.js";
    import { VForm } from "./libs/vForm/vForm.js";
    let user = new VFormItem({
        tag: "input",
        label: "用户名",
        key: "user",
        attrs: {
            placeholder: "请输入用户名"
        },
        rules: [
            { prop: "required", msg: "请输入用户名", trigger: "blur" }
        ]
    });
    
    let pwd = new VFormItem({
        tag: "input",
        label: "密码",
        key: "pwd",
        attrs: {
            type: "password",
            placeholder: "请输入密码"
        },
        rules: [
            { prop: "required", msg: "请输入密码", trigger: "blur" }
        ]
    });
    
    let casId = new VFormItem({
        tag: "input",
        label: "学号",
        key: "casId",
        attrs: {
            type: "input",
            placeholder: "请输入学号"
        },
        rules: [
            { prop: "required", msg: "请输入学号", trigger: "blur" }
        ]
    });
    
    let vForm = new VForm({
        title: "登录",
        items: [user, pwd, casId],
        showBtn: false
    }).mount("#regist");
    


    let goRegist = document.querySelector(".goRegist");
    
    goRegist.addEventListener("click", () => {
        location.hash = "/auth/login";
    })
    `
};





regist = new View(regist);

export default regist;