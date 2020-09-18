import View from "../view.js";

let wanna = {
    name: "wanna",
    template: `
    <section class="myInfo">
        Wanna
    </section>
    `,
    plainScript: `
        notify.danger({
            msg: "测试错误"
        })
    `
};

wanna = new View(wanna);
export default wanna;