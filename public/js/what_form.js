import { Drag } from './js/utils/drag.js';
import { VForm } from './libs/vForm/vForm.js'
import { VFormItem } from './libs/vForm/vForm-item.js'
import { utils } from './js/utils/utils.js';

(function() {
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
                    { prop: "required", msg: "请选择开始时间", trigger: "blur" }
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
                    { prop: "required", msg: "请选择结束时间", trigger: "blur" }
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
                "生活": "生活-lightgreen"
            },
            rules: [
                { prop: "required", msg: "请至少选择一个标签类型", trigger: "blur" }
            ]
        })

        let vForm = new VForm({
            title: "新增事件",
            items: [title, desc, timeStart, timeEnd, tags],
            showBtn: true
        }).mount(whatForm);
        console.log(vForm);

        vForm.regist("submit", utils.debounce(function(data) {
                        data.data.date = headDate.innerText;
                        console.log(data);
                        axios.post("./Item/addItem", data.data)
                            .then(res => {
                                    console.log(res);
                                    if (res.data.code === 1) {
                                        notify.success("添加成功");
                                        setTimeout(() => {

                                                    axios.get(`./Item/getItem?date=${headDate.innerText}`).then(res => {
                                                                let data = res.data.data,
                                                                    str = ``;
                                                                console.log(data);
                                                                data = data.sort((a, b) => {
                                                                    let [aS, aE] = a.startTime.split(":");
                                                                    let [bS, bE] = b.startTime.split(":");
                                                                    return (parseInt(aS) * 100 + parseInt(aE) - parseInt(bS) * 100 - parseInt(bE));
                                                                })
                                                                data.forEach(item => {
                                                                            item.tag = item.tag.split(',').map(i => {
                                                                                return {
                                                                                    tagInfo: i.split("-")[0],
                                                                                    color: i.split("-")[1]
                                                                                }
                                                                            })
                                                                            str += `
        <li class="what-list-item">
        <div class="up clearfix">
            <h3 class="list-item-title">${item.title}</h3>
            <strong class="list-item-time">${item.startTime}-${item.endTime}</strong>
        </div>
        <div class="bottom">
            <p class="info">
                <span class="label">事项详情</span>
                <small class="list-item-desc">${item.desc}</small>
            </p>
            <span class="label">事项标签</span>
            <ul class="list-item-tags">
                ${(function(){
                    let result = "";
                    item.tag.forEach(tag=>{
                        result += `<li class="tag" style="background-color: ${tag.color}">${tag.tagInfo}</li>`
                    });
                    return result;
                })()}
            </ul>
            <div class="btn-wrap">
                <button class="btn btn-default btn-6 collapse">收起详情</button>
                ${(function(){
                    return item.isModule
                    ?'<button class="btn btn-danger btn-6 delete-module">删除模板</button>'
                    :'<button class="btn btn-primary btn-6 save-module">添加模板</button>'
                })()}
                <button class="btn btn-success btn-12" style="margin-top:.1rem">修改事项</button>
            </div>
        </div>
    </li>
        `
    });
    whatList.innerHTML = str;
    hideForm();
    })
    
            },10)
    
                } else {
                    notify.danger(res.data.msg);
                }
            })
    }, 500, true))




    popOut.addEventListener('click', showForm);
    close.addEventListener('click', hideForm);

    function showForm(ev) {
        ev.cancelBubble = true;
        ev.stopPropagation();
        ev.stopImmediatePropagation();
        console.log(ev)
        formWrap.classList.remove("hide");
        whatList.classList.add("hide");
        setTimeout(() => {
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

})()