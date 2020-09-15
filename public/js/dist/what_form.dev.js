"use strict";

var _drag = require("./utils/drag.js");

var _vForm = require("../libs/vForm/vForm.js");

var _vFormItem = require("../libs/vForm/vForm-item.js");

(function () {
  var formWrap = document.querySelector(".what-form-wrap");
  var whatForm = document.querySelector(".what-form");
  var close = document.querySelector('.close-what-form');
  var whatList = document.querySelector('.what-list'); // 悬浮图标

  var popDrag = new _drag.Drag('.add-schedule', {
    limitYT: 10,
    limitYB: 17,
    snapX: ".25rem"
  });
  var popOut = popDrag.el;
  var title = new _vFormItem.VFormItem({
    tag: "input",
    label: "标题",
    attrs: {
      placeholder: "请输入标题"
    }
  });
  var desc = new _vFormItem.VFormItem({
    tag: "textarea",
    label: "描述",
    attrs: {
      rows: 5,
      placeholder: "请输入描述"
    },
    style: {// height: "2rem"
    }
  });
  var vForm = new _vForm.VForm({
    title: "新增事件",
    items: [title, title, desc]
  });
  console.log(vForm);
  vForm.mount(whatForm);
  popOut.addEventListener('click', function () {
    formWrap.classList.remove("hide");
    whatList.classList.add("hide");
  });
  close.addEventListener('click', function () {
    formWrap.classList.add("hide");
    whatList.classList.remove("hide");
  });
})();