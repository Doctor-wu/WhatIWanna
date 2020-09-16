let whatPage = {
    template: `<main id="content">
    <!-- head -->
    <header id="main-header">
        <section class="head">
            <img style="width: 2rem;height:2rem;" src="./source/img/avatar.jpg" alt="avatar" class="head-avatar">
            <div class="head-info">
                <h3 class="head-title">What I Wanna</h3>
                <span class="username">Doctorwu</span>
            </div>
        </section>
        <input type="date" class="head-date" style="display: block;">
        <section class="date">
            <span class="head-date-span"></span>
        </section>
    </header>

    <!-- list -->
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


    <!-- footer -->
    <footer class="main-footer">
        <ul class="foot-list">
            <li class="foot-item">
                <span class="iconfont icon-jihua2"></span>
                <span>Wanna</span>
            </li>
            <li class="foot-item active">
                <span class="iconfont icon-jihua"></span>
                <span>What</span>
            </li>
            <li class="foot-item">
                <span class="iconfont icon-wode"></span>
                <span>I</span>
            </li>
        </ul>
    </footer>
</main>`,
    root: "#content",
    scripts: [
        "./js/what_module.js",
        "./js/head.js",
        "@@./js/what_form.js"
    ],
    sheets: [
        "./css/what-form.css",
        "./js/utils/passive.js",
        "./js/index.js",
        ""
    ]
};

export { whatPage };