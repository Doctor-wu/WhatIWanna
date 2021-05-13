import View from "../../view.js";
import RouteView from "../../route-view.js";

let auth = {
  name: "auth",
  template: `
    <section class="auth">
        __router-view__
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
        this.$router.data.user = user;
        this.$router.data.isLogin = true;
        location.hash = this.$router.cachedHash || "/home/whatList";
      }
    } catch (e) {
      console.error(e);
    }
  },
  components: [{ name: "router-view", component: RouteView }]
};
auth = View.extend(auth);

export default auth;
