"use strict";

var _utils = require("/js/utils/utils.js");

(function () {
  var wanna = document.querySelector(".foot-item.wanna"),
      what = document.querySelector(".foot-item.what"),
      I = document.querySelector(".foot-item.i");
  what.addEventListener("click", _utils.utils.debounce(goWhat, 100));
  I.addEventListener("click", _utils.utils.debounce(goMyInfo, 100));
  wanna.addEventListener("click", _utils.utils.debounce(goWanna, 100));

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
})();