"use strict";

(function () {
  var date = document.querySelector('.date'),
      picker = document.querySelector('.head-date'),
      head = document.querySelector('.head-avatar'),
      today = new Date().toLocaleDateString().replace(/\//g, "-");
  today = today.split("-");
  today[1] = today[1] >= 10 ? today[1] : "0" + today[1];
  today = today.join("-");
  date.firstElementChild.innerText = today;
  picker.value = today;
  var wanna = document.querySelector(".foot-item.wanna"),
      what = document.querySelector(".foot-item.what"),
      I = document.querySelector(".foot-item.i");
  head.addEventListener("click", function () {
    I.classList.add("active");
    wanna.classList.remove("active");
    what.classList.remove("active");
    location.hash = "/home/myInfo";
  });

  function changeDate() {
    picker.classList.toggle("slideDown");
    date.firstElementChild.innerText = this.value || new Date().toLocaleDateString().replace(/\//g, "-");
  }

  function hideDate(ev) {
    if (!picker.contains(ev.target)) {
      picker.classList.toggle("slideDown");
      document.body.removeEventListener("click", hideDate);
    }
  }

  picker.addEventListener("change", changeDate);
  picker.addEventListener("blur", changeDate);
})();