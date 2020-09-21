import View from "../view.js";

let head = {
        name: "head",
        template: `<!-- head -->
    <header id="main-header">
        <section class="head">
            <img style="width: 2rem;height:2rem;" src="" alt="avatar" class="head-avatar">
            <div class="head-info">
                <h3 class="head-title">What I Wanna</h3>
                <span class="username"></span>
            </div>
        </section>
        <input type="date" class="head-date" style="display: block;">
        <section class="date">
            <span class="head-date-span"></span>
        </section>
    </header>`,
        plainScript: `
    import vt from "./js/index.js";
    (function() {
        let date = document.querySelector('.date'),
            picker = document.querySelector('.head-date'),
            head = document.querySelector('.head-avatar'),
            nameWrap = document.querySelector('.username'),
            today = (new Date()).toLocaleDateString().replace(/\\//g, "-"),
            avatar = document.querySelector('.head-avatar');
            let headDate = document.querySelector('.head-date-span');
            let whatList = document.querySelector('.what-list');
        if(vt.data.user.avatar){
            avatar.src = \`./avatars/\${vt.data.user.avatar}\`;
        }else{
            avatar.src = "./source/img/avatar.jpg";
        }
        nameWrap.innerText = vt.data.user.username;
        today = today.split("-");
        today[1] = today[1] >= 10 ? today[1] : "0" + today[1];
        today = today.join("-");
        date.firstElementChild.innerText = today;
        picker.value = today;
        let wanna = document.querySelector(".foot-item.wanna"),
            what = document.querySelector(".foot-item.what"),
            I = document.querySelector(".foot-item.i");
    
        head.addEventListener("click", function() {
            I.classList.add("active");
            wanna.classList.remove("active");
            what.classList.remove("active");
            location.hash = "/home/myInfo";
        });
    
        function changeDate() {
            date.firstElementChild.innerText = this.value || (new Date()).toLocaleDateString().replace(/\\//g, "-");
            setTimeout(() => {
                axios.get(\`./Item/getItem?date=\${headDate.innerText}\`).then(res => {
                            let data = res.data.data,
                                str = \`
        \`;
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
                                        str += \`
<li class="what-list-item">
<div class="up clearfix">
<h3 class="list-item-title">\${item.title}</h3>
<strong class="list-item-time">\${item.startTime}-\${item.endTime}</strong>
</div>
<div class="bottom">
<p class="info">
<span class="label">事项详情</span>
<small class="list-item-desc">\${item.desc}</small>
</p>
<span class="label">事项标签</span>
<ul class="list-item-tags">
\${(function(){
let result = "";
item.tag.forEach(tag=>{
    result += \`<li class="tag" style="background-color: \${tag.color}">\${tag.tagInfo}</li>\`
});
return result;
})()}
</ul>
<div class="btn-wrap">
<button class="btn btn-default btn-6 collapse">收起详情</button>
\${(function(){
return item.isModule
?'<button class="btn btn-danger btn-6 delete-module">删除模板</button>'
:'<button class="btn btn-primary btn-6 save-module">添加模板</button>'
})()}
<button class="btn btn-success btn-12" style="margin-top:.1rem">修改事项</button>
</div>
</div>
</li>
\`
});
whatList.innerHTML = str;
})

},100)

        }
    
        function hideDate(ev) {
            if (!picker.contains(ev.target)) {
                picker.classList.toggle("slideDown");
                document.body.removeEventListener("click", hideDate);
            }
        }
    
        picker.addEventListener("change", changeDate)
    
        picker.addEventListener("blur", changeDate)
    })()`
};
head = new View(head);

export default head;