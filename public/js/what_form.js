import { Drag } from './utils/drag.js';
import { VForm } from '../libs/vForm/vForm.js'
import { VFormItem } from '../libs/vForm/vForm-item.js'
import { utils } from './utils/utils.js';

(function() {
    let formWrap = document.querySelector(".what-form-wrap");
    let whatForm = document.querySelector(".what-form");
    let close = document.querySelector('.close-what-form');
    let whatList = document.querySelector('.what-list');

    // 悬浮图标
    let popDrag = new Drag('.add-schedule', {
        limitYT: 10,
        limitYB: 17,
        snapX: ".25rem"
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
            { prop: "required", msg: "请输入标题", trigger: "blur" }
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
            { prop: "required", msg: "请输入描述", trigger: "blur" }
        ]
    })

    let timeStart = new VFormItem({
            tag: "input",
            label: "事项时间",
            key: "timeStart",
            attrs: {
                placeholder: "请选择开始时间",
                type: "time"
            },
            style: "margin: 0 0 .2rem;width:50%;display:inline-block;padding-right:.1rem;",
            rules: [
                { prop: "required", msg: "请选择开始时间", trigger: "blur" }
            ]
        }),
        timeEnd = new VFormItem({
            tag: "input",
            key: "timeEnd",
            attrs: {
                placeholder: "请选择结束时间",
                type: "time"
            },
            style: "margin: .3rem 0 0.2rem 0;width:50%;display:inline-block;padding-left:0 .1rem;",
            rules: [
                { prop: "required", msg: "请选择结束时间", trigger: "blur" }
            ]
        });
    let tags = new VFormItem({
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
        rules: [
            { prop: "required", msg: "请至少选择一个标签类型", trigger: "blur" }
        ]
    })

    let vForm = new VForm({
        title: "新增事件",
        items: [title, desc, timeStart, timeEnd, tags]
    }).mount(whatForm);
    console.log(vForm);

    vForm.regist("submit", utils.debounce(function(data) {
        console.log(data);
    }, 500, true))




    popOut.addEventListener('click', showForm);
    close.addEventListener('click', hideForm);

    function showForm() {
        formWrap.classList.remove("hide");
        whatList.classList.add("hide");
        setTimeout(() => {
            document.addEventListener("click", handle);
        }, 5);
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

})()