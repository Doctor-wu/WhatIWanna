const router = require('koa-router')();

router.get('/', async(ctx) => {
    ctx.body = "首页";

});

module.exports = router.routes();