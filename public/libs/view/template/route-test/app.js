import RouterView from "../../route-view.js";
import View from "../../view.js";

let routeTest = {
  name: "APP",
  template: `
    <div>
      一级路由
      __router-view__
    </div>
    `,
  components: [{ name: "router-view", component: RouterView }],
};

routeTest = View.extend(routeTest);
console.log(routeTest);
export default routeTest;