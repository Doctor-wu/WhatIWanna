import { Drag } from './utils/drag.js';
import { VForm } from '../libs/vForm/vForm.js'
import { VFormItem } from '../libs/vForm/vForm-item.js'

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


    let title = new VFormItem({
        tag: "input",
        label: "标题",
        attrs: {
            placeholder: "请输入标题"
        }
    });

    let desc = new VFormItem({
        tag: "textarea",
        label: "描述",
        attrs: {
            rows: 5,
            placeholder: "请输入描述"
        },
        style: {
            // height: "2rem"
        }
    })

    let vForm = new VForm({
        title: "新增事件",
        items: [title, title, desc, desc, desc]
    });
    console.log(vForm);
    vForm.mount(whatForm)

    popOut.addEventListener('click', () => {
        formWrap.classList.remove("hide");
        whatList.classList.add("hide");
    })
    close.addEventListener('click', () => {
        formWrap.classList.add("hide");
        whatList.classList.remove("hide");
    });



})()