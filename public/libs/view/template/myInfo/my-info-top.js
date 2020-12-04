import View from "../../view.js";
import vt from "../../../../js/index.js";

let myInfoTop = {
    name: "myInfoTop",
    template: `
        <div class="my-info-content">
            <div class="my-info-head">
                <div class="bg-wrapper">
                    <img src="../../../../assets/myInfoBG.jpg" alt="">
                </div>    
                <div class="my-info_avatar__wrapper">
                    <div class="may-info_avatar__right">
                        <img class="my-info_avatar__content" src="" alt="">
                        <strong>
                            <h4 class="my-info_avatar__nickname">
                                
                            </h4>
                        </strong>
                    </div>
                </div>
            </div>
        </div>
    `,
    mounted(){
        let avatar = document.querySelector(".my-info_avatar__content"),
            nickName = document.querySelector(".my-info_avatar__nickname");
        nickName.innerText = vt.data.user.username;
        avatar.src = "./avatars/" +　vt.data.user.avatar;
        console.log(avatar);
    }
}
myInfoTop = new View(myInfoTop);

export default myInfoTop;
