import View from "../../view.js";
import login from "./login.js";

let regist = {
    name: "login",
    template: `<div>
    注册
    </div>`,
    components: [login],
    scripts: []
};

regist = new View(regist);

export default regist;