import { Viewtrigger } from "../libs/view/view-trigger.js";
import whatPage from "../libs/view/template/whatPage/what-page.js";
import myInfo from "../libs/view/myInfo/myInfo.js";
import whatList from "../libs/view/template/whatPage/whatList.js";
import wanna from "../libs/view/wanna/wanna.js";
import auth from "../libs/view/template/auth/auth.js";
import login from "../libs/view/template/auth/login.js";
import regist from "../libs/view/template/auth/regist.js";

// whatPage.mount("#app");

let viewMap = {
    home: '/auth/login',
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
    }, {
        path: "/auth",
        name: "auth",
        view: auth,
        children: [{
                path: 'login',
                name: 'login',
                view: login
            },
            {
                path: 'regist',
                name: 'regist',
                view: regist
            }
        ]
    }]
}

new Viewtrigger({
    root: document.querySelector("#app")
}).route(viewMap);