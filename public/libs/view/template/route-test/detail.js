import View from "../../view.js";

let DetailView = {
  name: "detail",
  template: `
    <h2>
      二级路由-详情
    </h2>
  `,
};

DetailView = View.extend(DetailView);
export default DetailView;