"use strict";

(function () {
  var whatList = document.querySelector('.what-list');
  whatList.addEventListener('click', function (ev) {
    var listItem = ev.path.find(function (p) {
      return p.className && p.className.includes("what-list-item");
    });

    if (listItem) {
      if (!listItem.className.includes("active")) {
        listItem.classList.add("active");
      } else {
        if (ev.target.classList.contains("collapse")) {
          listItem.classList.remove("active");
        }
      }
    }
  });
  axios.get('/getWhatList').then(function (res) {
    var data = res.data.data,
        str = "";
    data.forEach(function (item) {
      str += "\n            <li class=\"what-list-item\">\n            <div class=\"up clearfix\">\n                <h3 class=\"list-item-title\">".concat(item.name, "</h3>\n                <strong class=\"list-item-time\">").concat(item.time, "</strong>\n            </div>\n            <div class=\"bottom\">\n                <p class=\"info\">\n                    <span class=\"label\">\u4E8B\u9879\u8BE6\u60C5</span>\n                    <small class=\"list-item-desc\">").concat(item.desc, "</small>\n                </p>\n                <span class=\"label\">\u4E8B\u9879\u6807\u7B7E</span>\n                <ul class=\"list-item-tags\">\n                    ").concat(function () {
        var result = "";
        item.tag.forEach(function (tag) {
          result += "<li class=\"tag\" style=\"background-color: ".concat(tag.color, "\">").concat(tag.tagInfo, "</li>");
        });
        return result;
      }(), "\n                </ul>\n                <div class=\"btn-wrap\">\n                    <button class=\"btn btn-default btn-6 collapse\">\u6536\u8D77\u8BE6\u60C5</button>\n                    ").concat(function () {
        return item.isModule ? '<button class="btn btn-danger btn-6 delete-module">删除模板</button>' : '<button class="btn btn-primary btn-6 save-module">添加模板</button>';
      }(), "\n                    <button class=\"btn btn-success btn-12\" style=\"margin-top:.1rem\">\u4FEE\u6539\u4E8B\u9879</button>\n                </div>\n            </div>\n        </li>\n            ");
    });
    whatList.innerHTML = str;
  });
})();