const koaSession = require('koa-session');
const fs = require('fs');

const SESS_CONF = {
    key: 'dtwu:ssid', // cookie键名
    maxAge: 86400 * 1000, // 有效期
    httponly: true, // 仅服务器修改
    signed: true, // 签名cookie
    renew: true,
    /** cookie快过期时自动重新设置*/
}
module.exports = function(app) {
    try {
        let secret = fs.readFileSync('./utils/secret.json');
        console.log("读取密钥成功");
        app.keys = JSON.parse(secret.toString());
        app.use(koaSession(SESS_CONF, app));
    } catch (err) {
        console.error("加载session失败", err);
    }
}