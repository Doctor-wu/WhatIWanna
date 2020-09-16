import View from "../view.js";

let foot = {
    name: "foot",
    template: `<!-- footer -->
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
    </footer>`
};
foot = new View(foot);

export default foot;