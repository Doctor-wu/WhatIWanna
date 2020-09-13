const Koa = require('koa');
const app = new Koa();
const path = require('path');
require('./session')(app); // load koa-session
const static = require('koa-static');
app.use(static(path.resolve(__dirname, '../public'))); // load koa-static
const router = require('./router');
app.use(router); // load koa-router

// app.use((ctx) => {
//     if (ctx.path === '/favicon.ico') return;

//     let n = ctx.session.count || 0;

//     ctx.session.count = ++n;
//     ctx.body = `<h2>欢迎您第${n}次访问本站</h2>`
// });

app.listen(3000, () => {
    console.log('service is running at 3000')
});