import View from "../../view.js";

let auth = {
    name: "auth",
    template: `
    <section class="auth">
    __routeView__
    <ul class="left">
        <li></li>
        <li></li>
        <li></li>
    </ul>
    <ul class="right">
        <li></li>
        <li></li>
        <li></li>
    </ul>
    </section>`,
    scripts: []
};
auth = new View(auth);

export default auth;