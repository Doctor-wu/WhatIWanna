import View from "../../view.js";

let auth = {
    name: "auth",
    template: `
    <section class="auth">
    __routeView__
    <div class="mask"></div>
    </section>`,
    scripts: []
};
auth = new View(auth);

export default auth;