// router/index.js
const crypto = require("crypto");
const Router = require('koa-router');

// 
const User = require('../db/user')

// 子路由2
const page = new Router()

page.get('/404', async(ctx) => {
    ctx.body = 404;
})


const login = new Router()

login.get('/', async(ctx) => {
    ctx.body = "login";
}).post('/', async(ctx) => {
    const data = ctx.request.body;
    if (!data.casId) {
        ctx.body = {
            'code': 0,
            'data': {},
            'msg': '用户名[学号]不能为空!'
        };
        return;
    }
    if (!data.password) {
        ctx.body = {
            'code': 0,
            'data': {},
            'msg': '密码不能为空!'
        };
        return;
    }
    let queryres = await User.queryCasId(data.casId);
    console.log(queryres);
    if (queryres) {
        let pwd = crypto.createHash("md5").update(data.password || "").digest("hex");
        if (queryres[0].password === pwd) {
            ctx.session.user = queryres[0];
            console.log(ctx.session)
            ctx.body = {
                'code': 1,
                'data': queryres[0],
                'msg': '登录成功'
            }
        } else {
            ctx.body = {
                'code': 0,
                'data': {},
                'msg': '密码错误'
            }
        }

    } else {
        ctx.body = {
            'code': 0,
            'data': {},
            'msg': '没有该用户，用户名需要输入注册时的学号噢'
        }
    }
})

const register = new Router()

register.get('/', async(ctx) => {
    ctx.body = "注册";
}).post('/', async(ctx) => {
    const data = ctx.request.body;

    let queryres = await User.queryUsername(data.username);
    console.log(queryres)
    if (queryres) {
        ctx.body = {
            'code': 1,
            'data': {},
            'msg': '用户名已存在'
        }
        return;
    }
    queryres = await User.queryCasId(data.casId);
    if (queryres) {
        ctx.body = {
            'code': 1,
            'data': {},
            'msg': '学号已存在'
        }
        return;
    }
    let valid = await User.save(data);
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
            'msg': '注册成功'
        }
    }

})

// 装载所有子路由
// router.use('/page', page.routes(), page.allowedMethods())
// router.use('/login', login.routes(), login.allowedMethods())
// router.use('/register', register.routes(), register.allowedMethods())


module.exports = {
    error: page,
    login: login,
    register: register
}