import View from "../../view.js";
import head from "../head.js";

import {refreshList} from "../../../../js/what_module.js";
import {Drag} from '../../../../js/utils/drag.js';
import {VForm} from '../../../../libs/vForm/vForm.js'
import {VFormItem} from '../../../../libs/vForm/vForm-item.js'
import {utils} from '../../../../js/utils/utils.js';

let whatList = {
  name: "whatList",
  template: `<div>
    __head__
    <ul class="what-list">
    </ul>
    <div class="no-item hide">
         <span class="iconfont icon-jihua2"></span>
         暂无事项
    </div>

    <span class="add-schedule">
        <span class="iconfont icon-jia"></span>
    </span>

    <div class="what-form-wrap hide">
        <h2 class="form-title">
            新增事项
            <a href="javascript:0" class="close-what-form"><span class="iconfont icon-cuowu"></span></a>
        </h2>
        <i class="what-form"></i>
    </div>
    </div>`,
  components: [head],
  // scripts: [
  //     "./js/what_form.js"
  // ],
  mounted() {


    let whatList = document.querySelector('.what-list');
    whatList.addEventListener('click', function (ev) {
      let listItem = ev.path.find(p => p.className && p.className.includes("what-list-item"));
      if (listItem) {
        if (!listItem.className.includes("active")) {
          listItem.classList.add("active");
        } else if (ev.target.classList.contains("collapse")) {
          listItem.classList.remove("active");
        }
      }
    });
    refreshList();

    (function () {
      let formWrap = document.querySelector(".what-form-wrap");
      let whatForm = document.querySelector(".what-form");
      let close = document.querySelector('.close-what-form');
      let whatList = document.querySelector('.what-list');
      let headDate = document.querySelector('.head-date-span');

      // 悬浮图标
      let popDrag = new Drag('.add-schedule', {
        limitYT: 10,
        limitYB: 17,
        snapX: 3
      });
      let popOut = popDrag.el;


      // 新增事件表单
      let title = new VFormItem({
        tag: "input",
        label: "事项标题",
        key: "title",
        attrs: {
          placeholder: "请输入标题"
        },
        rules: [
          {prop: "required", msg: "请输入标题", trigger: "blur"}
        ]
      });

      let desc = new VFormItem({
        tag: "textarea",
        label: "事项描述",
        key: "desc",
        attrs: {
          rows: 5,
          placeholder: "请输入描述"
        },
        rules: [
          {prop: "required", msg: "请输入描述", trigger: "blur"}
        ]
      });

      let timeStart = new VFormItem({
            tag: "input",
            label: "事项时间",
            key: "startTime",
            attrs: {
              placeholder: "请选择开始时间",
              type: "time"
            },
            style: "margin: 0 0 .2rem;width:50%;display:inline-block;padding-right:.1rem;",
            rules: [
              {prop: "required", msg: "请选择开始时间", trigger: "blur"}
            ]
          }),
          timeEnd = new VFormItem({
            tag: "input",
            key: "endTime",
            attrs: {
              placeholder: "请选择结束时间",
              type: "time"
            },
            style: "margin: .3rem 0 0.2rem 0;width:50%;display:inline-block;padding-left:0 .1rem;",
            rules: [
              {prop: "required", msg: "请选择结束时间", trigger: "blur"}
            ]
          });
      let tags = new VFormItem({
        tag: "select",
        label: "事项标签",
        key: "tag",
        attrs: {
          placeholder: "请选择标签类型",
          multiple: "multiple"
        },
        opts: {
          "日常": "日常-#ffc93c",
          "生活": "生活-lightgreen",
          "学习": "学习-#40a8c4",
          "运动": "运动-hotpink",
          "其他": "其他-gray"
        },
        rules: [
          {prop: "required", msg: "请至少选择一个标签类型", trigger: "blur"}
        ]
      })

      let vForm = new VForm({
        title: "新增事件",
        items: [title, desc, timeStart, timeEnd, tags],
        showBtn: true
      }).mount(whatForm);
      vForm.el._data = vForm;

      vForm.hide = hideForm;
      vForm.show = showForm;
      console.log(vForm);

      vForm.regist("submit", utils.debounce(function (data) {
        console.log(data);
        data.data.date = utils.formatTime('{0}-{1}-{2}', headDate.innerText);//
        if (vForm.type === "update") {
          data.data.id = vForm.itemId;
          axios.post("./Item/updateItem", data.data)
              .then(res => {
                console.log(res);
                if (res.data.code === 1) {
                  notify.success("更新成功");
                  vForm.reset();
                  refreshList();
                  hideForm();

                  delete vForm.itemId;
                  delete vForm.type;
                } else {
                  notify.danger(res.data.msg);
                }
              })
        } else {
          axios.post("./Item/addItem", data.data)
              .then(res => {
                console.log(res);
                if (res.data.code === 1) {
                  notify.success("添加成功");
                  vForm.reset();
                  refreshList();
                  hideForm();

                  delete vForm.itemId;
                  delete vForm.type;
                } else {
                  notify.danger(res.data.msg);
                }
              })
        }
      }, 500, true))

      popOut.addEventListener('click', showForm);
      close.addEventListener('click', hideForm);

      function showForm(ev) {
        ev && (ev.cancelBubble = true);
        ev && ev.stopPropagation();
        ev && ev.stopImmediatePropagation();
        formWrap.classList.remove("hide");
        whatList.classList.add("hide");
        setTimeout(() => {
          document.addEventListener("click", handle);
        }, 100);
      }

      function hideForm() {
        formWrap.classList.add("hide");
        whatList.classList.remove("hide");
        vForm.reset();
        document.removeEventListener("click", handle);
      }

      function handle(ev) {
        if (!formWrap.contains(ev.target)) {
          document.removeEventListener("click", handle);
          hideForm();
        }
      }

    })()
  }
};

whatList = new View(whatList);

export default whatList;
