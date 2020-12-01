import View from "../libs/view/view.js";
import { utils } from "./utils/utils.js";

export function refreshList() {
  let headDate = document.querySelector(".head-date-span");
  let whatList = document.querySelector(".what-list");
  setTimeout(() => {
    let vForm = document.querySelector(".what-form-wrap>.vform")._data;
    axios
      .get(
        `./Item/getItem?date=${utils.formatTime(
            "{0}-{1}-{2}",
            headDate.innerText
        )}`
      )
      .then((res) => {
        let data = res.data.data;
        let noItem = document.querySelector(".no-item");
        if (data.length === 0) {
          noItem.classList.remove("hide");

        } else {
          noItem.classList.add("hide");
          data = data.sort((a, b) => {
            let [aS, aE] = a.startTime.split(":");
            let [bS, bE] = b.startTime.split(":");
            return (
                parseInt(aS) * 100 +
                parseInt(aE) -
                parseInt(bS) * 100 -
                parseInt(bE)
            );
          });
        }
        whatList.innerHTML = "";
        data.forEach((item) => {
          item.tag = item.tag.split(",").map((i) => {
            return {
              tagInfo: i.split("-")[0],
              color: i.split("-")[1],
            };
          });
          let v = new View({
            template: `
                                            <li class="what-list-item">
                                            <div class="up clearfix">
                                                <h3 class="list-item-title">${
                                                  item.title
                                                }</h3>
                                                <strong class="list-item-time">${
                                                  item.startTime
                                                }-${item.endTime}</strong>
                                            </div>
                                            <div class="bottom">
                                                <p class="info">
                                                    <span class="label">事项详情</span>
                                                    <small class="list-item-desc">${
                                                      item.desc
                                                    }</small>
                                                </p>
                                                <span class="label">事项标签</span>
                                                <ul class="list-item-tags">
                                                    ${(function () {
                                                      let result = "";
                                                      item.tag.forEach(
                                                        (tag) => {
                                                          result += `<li class="tag" style="background-color: ${tag.color}">${tag.tagInfo}</li>`;
                                                        }
                                                      );
                                                      return result;
                                                    })()}
                                                </ul>
                                                <div class="btn-wrap">
                                                    <button class="btn btn-default btn-6 collapse">收起详情</button>
                                                    ${(function () {
                                                      return item.isModule
                                                        ? '<button class="btn btn-warning btn-6 delete-module">删除模板</button>'
                                                        : '<button class="btn btn-primary btn-6 save-module">添加模板</button>';
                                                    })()}
                                                    <button class="btn btn-success btn-6 update" style="margin-top:.1rem">修改事项</button>
                                                    <button class="btn btn-danger btn-6 delete" style="margin-top:.1rem">删除事项</button>
                                                </div>
                                            </div>
                                            </li>
                                        `,
            name: "whatitem",
            renderType: "append",
            mounted() {
              this.el._data = item;
              let collapse = this.el.querySelector(".collapse");
              let delModule = this.el.querySelector(".delete-module");
              let saveModule = this.el.querySelector(".save-module");
              let update = this.el.querySelector(".update");
              let del = this.el.querySelector(".delete");
              // console.log(delModule,saveModule,update,del);
              saveModule &&
                saveModule.addEventListener(
                  "click",
                  utils.debounce(
                    () => {
                      axios
                        .post("./Module/addModule", {
                          id: item._id,
                        })
                        .then((res) => {
                          console.log(res);
                          if (res.data.code === 1) {
                            notify.success(res.data.msg);
                            refreshList();
                          } else {
                            notify.danger(res.data.msg);
                          }
                        });
                    },
                    null,
                    true
                  )
                );
              delModule &&
                delModule.addEventListener(
                  "click",
                  utils.debounce(
                    () => {
                      axios
                        .delete(`./Module/deleteModule?id=${item._id}`)
                        .then((res) => {
                          if (res.data.code === 1) {
                            notify.success(res.data.msg);
                            refreshList();
                          } else {
                            notify.danger(res.data.msg);
                          }
                        });
                    },
                    null,
                    true
                  )
                );
              update &&
                update.addEventListener(
                  "click",
                  utils.debounce(
                    () => {
                      vForm.type = "update";
                      if (typeof item.tag[0] !== "string")
                        item.tag = item.tag.map(
                          (v) => v.tagInfo + "-" + v.color
                        );
                      vForm.items.forEach((i) => {
                        i.value = item[i.key];
                        if (i.key === "tag") {
                          // i.value = item[tag].split
                          [].forEach.call(i.control, (option) => {
                            if (item.tag.includes(option.value)) {
                              option.selected = true;
                            }
                          });
                        }
                      });
                      vForm.itemId = item._id;
                      vForm.show();
                    },
                    null,
                    true
                  )
                );
              del &&
                del.addEventListener(
                  "click",
                  utils.debounce(
                    () => {
                      axios
                        .delete(`./Item/deleteItem?id=${item._id}`)
                        .then((res) => {
                          if (res.data.code === 1) {
                            notify.success("删除成功");
                            vForm.reset();
                            refreshList();
                            collapse.click();
                          } else {
                            notify.danger(res.data.msg);
                          }
                        });
                    },
                    null,
                    true
                  )
                );
            },
          }).mount(whatList);
        });
      });
  }, 100);
}
