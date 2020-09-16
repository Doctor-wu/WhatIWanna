import { Viewtrigger } from "../libs/view/view-trigger.js";
import whatPage from "../libs/view/template/what-page.js";
import test2 from "../libs/view/template/test2.js";
import whatList from "../libs/view/template/whatList.js";

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
            },
            {
                path: 'test2',
                name: 'test2',
                view: test2
            }
        ]
    }]
}

new Viewtrigger({
    root: document.querySelector("#app")
}).route(viewMap);