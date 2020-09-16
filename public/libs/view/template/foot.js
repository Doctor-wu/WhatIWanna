import View from "../view.js";

let foot = {
    name: "foot",
    template: `<!-- footer -->
    <footer class="main-footer">
        <ul class="foot-list">
            <li class="foot-item wanna">
                <span class="iconfont icon-jihua2"></span>
                <span>Wanna</span>
            </li>
            <li class="foot-item what active">
                <span class="iconfont icon-jihua"></span>
                <span>What</span>
            </li>
            <li class="foot-item i">
                <span class="iconfont icon-wode"></span>
                <span>I</span>
            </li>
        </ul>
    </footer>`,
    scripts: [
        "./js/foot.js"
    ]
};
foot = new View(foot);

export default foot;