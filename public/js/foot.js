import { utils } from "/js/utils/utils.js";

(function() {
    let wanna = document.querySelector(".foot-item.wanna"),
        what = document.querySelector(".foot-item.what"),
        I = document.querySelector(".foot-item.i");
    what.addEventListener("click", utils.debounce(goWhat, 100));
    I.addEventListener("click", utils.debounce(goMyInfo, 100));
    wanna.addEventListener("click", utils.debounce(goWanna, 100));


    function goWhat() {
        what.classList.add("active");
        wanna.classList.remove("active");
        I.classList.remove("active");
        location.hash = "/home/whatList";
    }

    function goMyInfo() {
        I.classList.add("active");
        wanna.classList.remove("active");
        what.classList.remove("active");
        location.hash = "/home/myInfo";
    }

    function goWanna() {
        wanna.classList.add("active");
        I.classList.remove("active");
        what.classList.remove("active");
        location.hash = "/home/wanna";
    }
})()