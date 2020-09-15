"use strict";

(function () {
  var span = document.querySelector('.head-date-span'),
      date = document.querySelector('.head-date');
  span.addEventListener("click", function () {
    var ev = document.createEvent('MouseEvents');
    ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    date.dispatchEvent(ev);
  });
  date.addEventListener("click", function () {
    console.dir(date);
  });
})();