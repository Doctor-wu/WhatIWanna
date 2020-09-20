import View from "../view.js";

let myInfo = {
    name: "myInfo",
    template: `
    <section class="myInfo">
        <div class="btn-wrap">
            <button class="btn btn-12 btn-danger logout">退出登录</button>
        </div>
    </section>
    `,
    plainScript: `
    import vt from "./js/index.js";
        notify.info({
            msg: "测试消息"
        })
        let logout = document.querySelector(".logout");
        logout.addEventListener("click",function(){
            let username = vt.data.user.username;
            sessionStorage.removeItem("user");
            delete vt.data.user;
            vt.data.isLogin = false;
            notify.success(\`退出成功😀<br>欢迎[\${username}]下次访问\`);
            location.hash = "/auth/login"
        })
    `
};
myInfo = new View(myInfo);
export default myInfo;