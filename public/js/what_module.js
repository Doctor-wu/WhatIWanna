(function() {
        let whatList = document.querySelector('.what-list');
        let headDate = document.querySelector('.head-date-span');
        console.log(headDate.innerText);
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
})

        },100)
})()