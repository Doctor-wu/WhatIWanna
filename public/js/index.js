import { Viewtrigger } from "../libs/view/view-trigger.js";
import whatPage from "../libs/view/template/whatPage/what-page.js";
import myInfo from "../libs/view/template/myInfo/myInfo.js";
import whatList from "../libs/view/template/whatPage/whatList.js";
import wanna from "../libs/view/template/wanna/wanna.js";
import auth from "../libs/view/template/auth/auth.js";
import login from "../libs/view/template/auth/login.js";
import regist from "../libs/view/template/auth/regist.js";


let viewMap = {
    home: '/auth/login',
    map: [{
        path: '/home',
        name: '首页',
        view: whatPage,
        children: [{
            path: 'whatList',
            name: '事项列表',
            view: whatList
        }, {
            path: 'myInfo',
            name: '关于我的',
            view: myInfo
        }, {
            path: 'wanna',
            name: '我的目标',
            view: wanna
        }]
    }, {
        path: "/auth",
        name: "认证",
        view: auth,
        children: [{
                path: 'login',
                name: '登录',
                view: login
            },
            {
                path: 'regist',
                name: '注册',
                view: regist
            }
        ]
    }]
}


let vt = new Viewtrigger({
    root: document.querySelector("#app")
}).route(viewMap);

export let whiteList = ["/auth/login", "/auth/regist"];

vt.regist("beforeChildFlush", (route) => {
    document.title = route.name + "-WhatIWanna"
    // notify.success({
    //     title: "路由切换",
    //     msg: route.name
    // });
});

vt.beforeRoute((from, to, next, reject) => {
    if (!vt.data.user && !whiteList.includes(to.path)) {
        reject("/auth/login");
        notify.warn("您尚未登录，请登陆后重试。")
    } else {
        next();
    }
});

export default vt;
