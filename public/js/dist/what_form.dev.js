"use strict";

var _drag = require("./js/utils/drag.js");

var _vForm = require("./libs/vForm/vForm.js");

var _vFormItem = require("./libs/vForm/vForm-item.js");

var _utils = require("./js/utils/utils.js");

(function () {
  var formWrap = document.querySelector(".what-form-wrap");
  var whatForm = document.querySelector(".what-form");
  var close = document.querySelector('.close-what-form');
  var whatList = document.querySelector('.what-list'); // 悬浮图标

  var popDrag = new _drag.Drag('.add-schedule', {
    limitYT: 10,
    limitYB: 17,
    snapX: 3
  });
  var popOut = popDrag.el; // 新增事件表单

  var title = new _vFormItem.VFormItem({
    tag: "input",
    label: "事项标题",
    key: "title",
    attrs: {
      placeholder: "请输入标题"
    },
    rules: [{
      prop: "required",
      msg: "请输入标题",
      trigger: "blur"
    }]
  });
  var desc = new _vFormItem.VFormItem({
    tag: "textarea",
    label: "事项描述",
    key: "desc",
    attrs: {
      rows: 5,
      placeholder: "请输入描述"
    },
    rules: [{
      prop: "required",
      msg: "请输入描述",
      trigger: "blur"
    }]
  });
  var timeStart = new _vFormItem.VFormItem({
    tag: "input",
    label: "事项时间",
    key: "timeStart",
    attrs: {
      placeholder: "请选择开始时间",
      type: "time"
    },
    style: "margin: 0 0 .2rem;width:50%;display:inline-block;padding-right:.1rem;",
    rules: [{
      prop: "required",
      msg: "请选择开始时间",
      trigger: "blur"
    }]
  }),
      timeEnd = new _vFormItem.VFormItem({
    tag: "input",
    key: "timeEnd",
    attrs: {
      placeholder: "请选择结束时间",
      type: "time"
    },
    style: "margin: .3rem 0 0.2rem 0;width:50%;display:inline-block;padding-left:0 .1rem;",
    rules: [{
      prop: "required",
      msg: "请选择结束时间",
      trigger: "blur"
    }]
  });
  var tags = new _vFormItem.VFormItem({
    tag: "select",
    label: "事项标签",
    key: "tags",
    attrs: {
      placeholder: "请选择标签类型",
      multiple: "multiple"
    },
    opts: {
      "日常": "日常-#ffc93c",
      "生活": "生活-lightgreen"
    },
    rules: [{
      prop: "required",
      msg: "请至少选择一个标签类型",
      trigger: "blur"
    }]
  });
  var vForm = new _vForm.VForm({
    title: "新增事件",
    items: [title, desc, timeStart, timeEnd, tags],
    showBtn: true
  }).mount(whatForm);
  console.log(vForm);
  vForm.regist("submit", _utils.utils.debounce(function (data) {
    console.log(data);
  }, 500, true));
  popOut.addEventListener('click', showForm);
  close.addEventListener('click', hideForm);

  function showForm(ev) {
    console.log(ev);
    formWrap.classList.remove("hide");
    whatList.classList.add("hide");
    setTimeout(function () {
      document.addEventListener("click", handle);
    }, 100);
  }

  function hideForm() {
    formWrap.classList.add("hide");
    whatList.classList.remove("hide");
    document.removeEventListener("click", handle);
  }

  function handle(ev) {
    if (!formWrap.contains(ev.target)) {
      document.removeEventListener("click", handle);
      hideForm();
    }
  }
})();