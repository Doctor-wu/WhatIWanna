import View from "../view.js";
import routeView from "./route-view.js";
import test1 from "./test1.js";
import test2 from "./test2.js";
import whatPage from "./what-page.js";

let viewMap = {
    map: [{
        path: '/whatList',
        name: 'layout',
        view: whatPage,
        children: [{
                path: 'test1',
                name: 'test1',
                view: test1
            },
            {
                path: 'test2',
                name: 'test2',
                view: test2
            }
        ]
    }]
}

const app = new View({
    template: `__routeView__`,
    el: "#app",
    components: [routeView.route(viewMap)]
});
console.log(app);

export default app;