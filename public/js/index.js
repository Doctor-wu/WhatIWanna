import { Viewtrigger } from "../libs/view/view-trigger.js";
import whatPage from "../libs/view/template/what-page.js";
import myInfo from "../libs/view/template/myInfo.js";
import whatList from "../libs/view/template/whatList.js";
import wanna from "../libs/view/template/wanna.js";

// whatPage.mount("#app");

let viewMap = {
    home: '/home/whatList',
    map: [{
        path: '/home',
        name: 'layout',
        view: whatPage,
        children: [{
            path: 'whatList',
            name: 'whatList',
            view: whatList
        }, {
            path: 'myInfo',
            name: 'myInfo',
            view: myInfo
        }, {
            path: 'wanna',
            name: 'wanna',
            view: wanna
        }]
    }]
}

new Viewtrigger({
    root: document.querySelector("#app")
}).route(viewMap);