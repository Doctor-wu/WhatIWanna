// router/index.js
const Router = require('koa-router');

// 
const ItemDB = require('../db/whatItem');

// 子路由2
const Item = new Router()

Item.post('/addItem', async(ctx) => {
    const data = ctx.request.body;
    data.belong = ctx.session.user._id + "";

    let valid = await ItemDB.addItem(data);
    if (valid && valid.failed) {
        ctx.body = {
            code: 0,
            data: {},
            'msg': valid.reason.message
        }
        return;
    } else {
        ctx.body = {
            'code': 1,
            'data': {},
            'msg': '添加成功'
        }
    }
}).get('/getItem', async(ctx) => {
    const { date } = ctx.request.query;
    if (!date) {
        ctx.body = {
            code: 0,
            data: {},
            msg: "date is requried"
        }
    }
    let raw = await ItemDB.getItem(ctx.session.user._id + "", date);
    ctx.body = {
        code: 1,
        data: raw,
        msg: "获取成功"
    };
}).post('/updateItem', async ctx => {
    const data = ctx.request.body;
    try {
        let raw = await ItemDB.updateItem(data.id, data);
        ctx.body = {
            code: 1,
            data: raw,
            msg: "更新成功"
        };
    } catch (e) {
        ctx.body = {
            code: 0,
            data: 3,
            msg: "更新失败"
        }
    }
}).delete("/deleteItem", async ctx => {
    const { id } = ctx.request.query;
    try {
        let raw = await ItemDB.deleteItem(id);
        ctx.body = {
            code: 1,
            data: raw || {},
            msg: "删除成功"
        };
    } catch (e) {
        console.log(e);
        ctx.body = {
            code: 0,
            data: {},
            msg: "删除失败"
        }
    }
});


const getItem = new Router();

getItem.post('/')


module.exports = {
    Item: Item
}