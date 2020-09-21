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
    console.log(ctx.session.user._id + "");
    let raw = await ItemDB.getItem(ctx.session.user._id + "", date);
    ctx.body = {
        code: 1,
        data: raw,
        msg: "获取成功"
    };
});


const getItem = new Router();

getItem.post('/')


module.exports = {
    Item: Item
}