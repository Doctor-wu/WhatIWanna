import View from "../../view.js";
import vt from "../../../../js/index.js";

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
    beforeMount() {
        try {
            let user = JSON.parse(sessionStorage.getItem("user"));
            if (user) {
                vt.data.user = user;
                vt.data.isLogin = true;
                location.hash = vt.cachedHash || "/home/whatList";
            }
        } catch (e) {
            console.error(e);
        }
    }
};
auth = new View(auth);

export default auth;
