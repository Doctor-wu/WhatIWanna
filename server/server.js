const Koa = require('koa');
const path = require('path');
const bodyparser = require('koa-bodyparser');
const static = require('koa-static');
const router = require('./router');
const app = new Koa();
require('./session')(app); // load koa-session
app.use(static(path.resolve(__dirname, '../public'))); // load koa-static
// app.use(async(ctx, next) => {
//     if (!ctx.session.user) {
//         ctx.response.redirect("/#/auth/login");
//     } else {
//         await next();
//     }
// });
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods()); // load koa-router

// app.use((ctx) => {
//     if (ctx.path === '/favicon.ico') return;
//     let n = ctx.session.count || 0;

//     ctx.session.count = ++n;
//     ctx.body = `<h2>欢迎您第${n}次访问本站</h2>`
// });
app.listen(3000, () => {
    console.log('service is running at 3000')
});