"use strict";

(function () {
  var span = document.querySelector('.head-date-span'),
      date = document.querySelector('.head-date');
  span.addEventListener("click", function () {
    date.click();
  });
})();