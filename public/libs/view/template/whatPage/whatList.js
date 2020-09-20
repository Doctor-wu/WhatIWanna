import View from "../../view.js";
import head from '../head.js';
let whatList = {
    name: "whatList",
    template: `<div>
    __head__
    <ul class="what-list">
    </ul>

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
    scripts: [
        "./js/what_module.js",
        "./js/what_form.js"
    ],
    beforeMount() {
        console.log(this)
    }
};

whatList = new View(whatList);

export default whatList;