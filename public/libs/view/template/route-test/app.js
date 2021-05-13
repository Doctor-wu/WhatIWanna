import RouterView from "../../route-view.js";
import View from "../../view.js";

let routeTest = {
  name: "APP",
  template: `__router-view__`,
  components: [{ name: "router-view", component: RouterView }],
};

routeTest = View.extend(routeTest);
export default routeTest;