import vt from "../../js/index.js";
import View from "./view.js";


const RouteView = View.extend({
  name: "router-view",
  template: "__slot__",
  slot: {
    default: function () {
      const Comp = (this.$router.getMatched());
      if (Comp) {
        const code = new Comp.view().target;
        console.log(code);
        return code;
      } else {
        return "No View Matched"
      }
    }
  }
});

export default RouteView;