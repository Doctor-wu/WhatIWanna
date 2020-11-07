import View from "../../view.js";

let myInfo = {
  name: "myInfo",
  template: `
    <section class="myInfo">
        <div class="btn-wrap">
            <button class="btn btn-12 btn-success changeAvatar">更换头像</button>
            <input type="file" style="display: none" id="avatarFile"></input>
            <button class="btn btn-12 btn-danger logout">退出登录</button>
        </div>
    </section>
    `,
  plainScript: `
  import vt from "./js/index.js";
  import {Drag} from "./js/utils/drag.js";
    import Dialog from "./libs/dialog.js";
        // notify.info({
        //     msg: "测试消息"
        // })
        console.log(new Dialog({
            msg: "测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息测试消息",
            confirmTxt: "提交",
            cancelTxt: "关闭"
        }));
        let logout = document.querySelector(".logout");
        let changeAvatar = document.querySelector(".changeAvatar");
        let avatarFile = document.querySelector("#avatarFile");


        logout.addEventListener("click",function(){
            let username = vt.data.user.username;
            sessionStorage.removeItem("user");
            delete vt.data.user;
            vt.data.isLogin = false;
            notify.success(\`退出成功😀<br>欢迎 [\${username}] 下次访问\`);
            location.hash = "/auth/login"
        });

        avatarFile.addEventListener("change",function(){
            let form = new FormData;
            form.append("tmpFile",this.files[0]);
            console.log(form.values().next(),this.files[0],this.files[0].name);
            axios("./changeAvatar",{
                "method": 'post',
                "data": form,
                "content-type": "multipart/form-data;"
            }).then(res=>{
                if(res.data.code===1){
                    notify.success("上传成功!");
                    vt.data.user.avatar = res.data.data;
                    location.hash = "#/home/whatList"
                }else{
                    notify.danger(res.data.msg);
                }
            })
        })


        changeAvatar.addEventListener("click",function(ev){
            avatarFile.click();
        })
    `,
};
myInfo = new View(myInfo);
export default myInfo;
