// router/index.js
const Router = require('koa-router');

//
const ModuleDB = require('../db/itemModule');
const ItemDB = require("../db/whatItem");

// 子路由2

const Module = new Router();

Module.post("/addModule", async ctx => {
    const {id} = ctx.request.body;
    let item = await ItemDB.getItemById(id);
    item = item[0];
    delete item['isModule'];
    delete item['_id'];
    delete item["belong"];
    let resultItem = {};
    for (const key in item) {
        if (key.indexOf("_id") !== -1) continue;
        resultItem[key] = item[key];
    }
    try {
        let res = await ModuleDB.addModule(resultItem);

        ctx.body = {
            code: 1,
            data: {},
            msg: "添加模板成功"
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            data: {},
            msg: e
        }
    }
}).delete("/deleteModule", async ctx => {
    const { id } = ctx.request.query;
    // console.log(i, ctx.request.query);
    try {
        let res = await ModuleDB.removeModule(id);

        ctx.body = {
            code: 1,
            data: {},
            msg: res
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            data: {},
            msg: e
        }
    }
}).get("/getModules", async ctx => {
    try {
        let modules = await ModuleDB.getModules(ctx.session.user._id);
        ctx.body = {
            code: 1,
            data: modules,
            msg: ""
        }
    } catch (e) {
        ctx.body = {
            code: 0,
            data: e,
            msg: ""
        }
    }
})


module.exports = {
    Module: Module
}
