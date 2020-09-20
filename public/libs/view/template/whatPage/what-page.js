import foot from '../foot.js';
import View from '../../view.js';


let whatPage = {
    template: `
    <main id="content">
        __routeView__
        __foot__
    </main>`,
    components: [foot],
    name: "whatPage",
};
whatPage = new View(whatPage);
// whatPage.component(foot);
// head.parent = whatPage;

export default whatPage;