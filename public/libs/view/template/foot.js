import View from "../view.js";
import {utils} from "../../../js/utils/utils.js"
let foot = {
    name: "foot",
    template: `<!-- footer -->
    <footer class="main-footer">
        <ul class="foot-list">
            <li class="foot-item wanna">
                <span class="iconfont icon-jihua2"></span>
                <span>Wanna</span>
            </li>
            <li class="foot-item what active">
                <span class="iconfont icon-jihua"></span>
                <span>What</span>
            </li>
            <li class="foot-item i">
                <span class="iconfont icon-wode"></span>
                <span>I</span>
            </li>
        </ul>
    </footer>`,
    // scripts: [
    //     "./js/foot.js"
    // ]
    mounted: function () {
        const wanna = document.querySelector(".foot-item.wanna"),
            what = document.querySelector(".foot-item.what"),
            I = document.querySelector(".foot-item.i");
        what.addEventListener("click", utils.debounce(goWhat, 100));
        I.addEventListener("click", utils.debounce(goMyInfo, 100));
        wanna.addEventListener("click", utils.debounce(goWanna, 100));


        function goWhat() {
            location.hash = "/home/whatList";
        }

        function goMyInfo() {
            location.hash = "/home/myInfo";
        }

        function goWanna() {
            location.hash = "/home/wanna";
        }

        function handler() {
            let path = location.hash.split("#")[1];
            switch (path) {
                case "/home/whatList": {
                    what.classList.add("active");
                    wanna.classList.remove("active");
                    I.classList.remove("active");
                    break;
                }
                case "/home/myInfo": {
                    I.classList.add("active");
                    wanna.classList.remove("active");
                    what.classList.remove("active");
                    break;
                }
                case "/home/wanna": {
                    wanna.classList.add("active");
                    what.classList.remove("active");
                    I.classList.remove("active");
                    break;
                }
            }
        }

        window.addEventListener("hashchange", handler);
        handler();
    }
};
foot = new View(foot);

export default foot;
