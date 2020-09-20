import View from "../../view.js";

let login = {
    name: "login",
    template: `<div class="login">
    <h3>登录</h3>
    <div id="login" style="height: 4rem"></div>
    <div class=".btn-wrap">
    <button class="btn btn-12 btn-success goLogin">登录</button>
    <button class="btn btn-12 btn-default goRegist">注册</button>
    </div>
    </div>`,
    plainScript: `
    import { VFormItem } from "./libs/vForm/vForm-item.js";
    import { VForm } from "./libs/vForm/vForm.js";
    import vt from "./js/index.js";
    (function(){
    let user = new VFormItem({
        tag: "input",
        label: "用户名",
        key: "casId",
        attrs: {
            placeholder: "请输入用户名[学号]",
            autocomplete: "username"
        },
        rules: [
            { prop: "required", msg: "请输入用户名[学号]", trigger: "blur" }
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
    }).mount("#login");
    


    let goLogin = document.querySelector(".goLogin");
    let goRegist = document.querySelector(".goRegist");
    vForm.mountBtn(goLogin);
    
    vForm.regist("submit",({valid,data})=>{
        axios.post("./login",data)
            .then(res => {
                if(res.data.code!==1){
                    notify.warn({
                        title: "oops!",
                        msg: res.data.msg
                    });
                }else{
                    vt.data.user = res.data.data;
                    sessionStorage.setItem("user",JSON.stringify(vt.data.user));
                    notify.success(\`登录成功😀<br/>欢迎你,[\$\{vt.data.user["username"]\}]\`);
                    location.hash = "/home/whatList";
                }
            });
    })
    goRegist.addEventListener("click", () => {
        location.hash = "/auth/regist";
    })
    })()
    `
};








login = new View(login);


export default login;