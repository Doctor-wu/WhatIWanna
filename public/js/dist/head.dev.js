"use strict";

(function () {
  var date = document.querySelector('.date'),
      picker = document.querySelector('.head-date');
  date.addEventListener("click", function () {
    // date.classList.toggle("slideDown");
    picker.classList.toggle("slideDown");
    setTimeout(function () {
      document.body.addEventListener("click", hideDate);
    }, 0);
  });

  function changeDate() {
    picker.classList.toggle("slideDown");
    date.innerText = this.value || new Date().toLocaleDateString().replace(/\//g, "-");
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