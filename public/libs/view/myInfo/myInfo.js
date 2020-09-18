import View from "../view.js";

let myInfo = {
    name: "myInfo",
    template: `
    <section class="myInfo">
        MyInfo
    </section>
    `,
    plainScript: `
        notify.info({
            msg: "测试消息"
        })
    `
};

myInfo = new View(myInfo);
export default myInfo;