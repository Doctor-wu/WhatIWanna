"use strict";

var _utils = require("./js/utils/utils.js");

(function () {
  var wanna = document.querySelector(".foot-item.wanna"),
      what = document.querySelector(".foot-item.what"),
      I = document.querySelector(".foot-item.i");
  what.addEventListener("click", _utils.utils.debounce(goWhat, 100));
  I.addEventListener("click", _utils.utils.debounce(goMyInfo, 100));
  wanna.addEventListener("click", _utils.utils.debounce(goWanna, 100));

  function goWhat() {
    location.hash = "/home/whatList";
  }

  function goMyInfo() {
    location.hash = "/home/myInfo";
  }

  function goWanna() {
    location.hash = "/home/wanna";
  }

  window.addEventListener("hashchange", function () {
    var path = location.hash.split("#")[1];

    switch (path) {
      case "/home/whatList":
        {
          what.classList.add("active");
          wanna.classList.remove("active");
          I.classList.remove("active");
          break;
        }

      case "/home/myInfo":
        {
          I.classList.add("active");
          wanna.classList.remove("active");
          what.classList.remove("active");
          break;
        }

      case "/home/wanna":
        {
          wanna.classList.add("active");
          what.classList.remove("active");
          I.classList.remove("active");
          break;
        }
    }

    console.log(path);
  });
})();