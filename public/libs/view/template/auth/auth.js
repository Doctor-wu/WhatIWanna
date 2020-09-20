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
    "beforeMount": function() {
        try {
            let user = JSON.parse(sessionStorage.getItem("user"));
            if (user) {
                vt.data.user = user;
                location.hash = '/home/whatList';
                return false;
            }
        } catch (e) {
            console.error(e);
        }
        return true;
    }
};
auth = new View(auth);

export default auth;