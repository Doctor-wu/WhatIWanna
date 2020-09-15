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
        label: "事件标题",
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
        label: "事件描述",
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
            label: "事件时间",
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
        })

    let vForm = new VForm({
        title: "新增事件",
        items: [title, desc, timeStart, timeEnd]
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