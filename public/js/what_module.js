(function() {
        let whatList = document.querySelector('.what-list');
        whatList.addEventListener('click', function(ev) {
            let listItem = ev.path.find(p => p.className && p.className.includes("what-list-item"));
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
        axios.get('/getWhatList').then(res => {
                    let data = res.data.data,
                        str = ``;
                    data.forEach(item => {
                                str += `
            <li class="what-list-item">
            <div class="up clearfix">
                <h3 class="list-item-title">${item.name}</h3>
                <strong class="list-item-time">${item.time}</strong>
            </div>
            <div class="bottom">
                <p class="info">
                    <span class="label">事件详情</span>
                    <small class="list-item-desc">${item.desc}</small>
                </p>
                <span class="label">事件标签</span>
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
                        ?'<button class="btn btn-danger btn-6 save-module">删除模板</button>'
                        :'<button class="btn btn-success btn-6 save-module">添加模板</button>'
                    })()}
                    
                </div>
            </div>
        </li>
            `
        });
        whatList.innerHTML = str;
    })
})()