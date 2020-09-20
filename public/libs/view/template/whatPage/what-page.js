import head from '../head.js';
import foot from '../foot.js';
import View from '../../view.js';


let whatPage = {
    template: `
    <main id="content">
        __head__
        __routeView__
        __foot__
    </main>`,
    components: [head, foot],
    name: "whatPage",
};
whatPage = new View(whatPage);
// whatPage.component(foot);
// head.parent = whatPage;

export default whatPage;