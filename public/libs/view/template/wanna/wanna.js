import RouterView from "../../route-view.js";
import View from "../../view.js";

let wanna = {
    name: "wanna",
    template: `
    <section class="myInfo">
        Wanna
        __router-view__
        __router-view__
        __router-view__
        __router-view__
    </section>
    `,
    components: [(sup) => new RouterView().mount(sup)],
};

wanna = new View(wanna);
export default wanna;