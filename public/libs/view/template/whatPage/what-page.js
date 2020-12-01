import foot from '../foot.js';
import View from '../../view.js';
// import head from "../head.js";
// let Head = new View(head);


let whatPage = {
    template: `
    <main id="content">
<!--    __head__-->
        __routeView__
        __foot__
    </main>`,
    components: [foot,
        // new View(head)
    ],
    name: "whatPage",
};
whatPage = new View(whatPage);
// whatPage.component(foot);
// head.parent = whatPage;

export default whatPage;
