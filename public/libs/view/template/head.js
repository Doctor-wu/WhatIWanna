import View from "../view.js";
import vt from "../../../js/index.js";
import {refreshList} from "../../../js/what_module.js";

let head = {
    name: "head",
    template: `
    <header id="main-header">
        <section class="head">
            <img style="width: 2rem;height:2rem;" src="" alt="avatar" class="head-avatar">
            <div class="head-info">
                <h3 class="head-title">What I Wanna</h3>
                <span class="username"></span>
            </div>
        </section>
        <input type="date" class="head-date" style="display: block;">
        <section class="date">
            <span class="head-date-span"></span>
        </section>
    </header>`,
    mounted() {
        let date = document.querySelector('.date'),
            picker = document.querySelector('.head-date'),
            head = document.querySelector('.head-avatar'),
            nameWrap = document.querySelector('.username'),
            today = (new Date()).toLocaleDateString().replace(/\//g, "-"),
            avatar = document.querySelector('.head-avatar');
        let headDate = document.querySelector('.head-date-span');
        let whatList = document.querySelector('.what-list');
        if (vt.data.user.avatar) {
            avatar.src = `./avatars/${vt.data.user.avatar}`;
        } else {
            avatar.src = "./source/img/avatar.jpg";
        }
        nameWrap.innerText = vt.data.user.username;
        today = today.split("-");
        today[1] = today[1] >= 10 ? today[1] : "0" + today[1];
        today = today.join("-");
        date.firstElementChild.innerText = today;
        picker.value = today;
        let wanna = document.querySelector(".foot-item.wanna"),
            what = document.querySelector(".foot-item.what"),
            I = document.querySelector(".foot-item.i");

        head.addEventListener("click", function () {
            I.classList.add("active");
            wanna.classList.remove("active");
            what.classList.remove("active");
            location.hash = "/home/myInfo";
        });

        function changeDate() {
            date.firstElementChild.innerText = this.value || (new Date()).toLocaleDateString().replace(/\//g, "-");
            refreshList();
        }

        function hideDate(ev) {
            if (!picker.contains(ev.target)) {
                picker.classList.toggle("slideDown");
                document.body.removeEventListener("click", hideDate);
            }
        }


        picker.addEventListener("change", changeDate)

        picker.addEventListener("blur", changeDate)
    }
};
head = new View(head);

export default head;
