"use strict";

var _require = require("./user"),
    error = _require.error,
    login = _require.login,
    register = _require.register;

var Router = require('koa-router');

var listRouter = new Router();
listRouter.get('/', function _callee(ctx, next) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ctx.body = JSON.stringify({
            code: 0,
            success: true,
            data: [{
              name: "起床",
              desc: "记得要按时起床呀~",
              time: "6:30-6:35",
              tag: [{
                color: "#ffc93c",
                tagInfo: "日常"
              }, {
                color: "lightgreen",
                tagInfo: "生活"
              }],
              isModule: false
            }, {
              name: "吃饭",
              desc: "记得要按时吃饭呀~",
              time: "6:35-7:00",
              tag: [{
                color: "#ffc93c",
                tagInfo: "日常"
              }, {
                color: "lightgreen",
                tagInfo: "生活"
              }],
              isModule: true
            }, {
              name: "起床",
              desc: "记得要按时起床呀~",
              time: "6:30-6:35",
              tag: [{
                color: "#ffc93c",
                tagInfo: "日常"
              }, {
                color: "lightgreen",
                tagInfo: "生活"
              }],
              isModule: false
            }, {
              name: "吃饭",
              desc: "记得要按时吃饭呀~",
              time: "6:35-7:00",
              tag: [{
                color: "#ffc93c",
                tagInfo: "日常"
              }, {
                color: "lightgreen",
                tagInfo: "生活"
              }],
              isModule: true
            }, {
              name: "起床",
              desc: "记得要按时起床呀~",
              time: "6:30-6:35",
              tag: [{
                color: "#ffc93c",
                tagInfo: "日常"
              }, {
                color: "lightgreen",
                tagInfo: "生活"
              }],
              isModule: false
            }, {
              name: "吃饭",
              desc: "记得要按时吃饭呀~",
              time: "6:35-7:00",
              tag: [{
                color: "#ffc93c",
                tagInfo: "日常"
              }, {
                color: "lightgreen",
                tagInfo: "生活"
              }],
              isModule: true
            }, {
              name: "起床",
              desc: "记得要按时起床呀~",
              time: "6:30-6:35",
              tag: [{
                color: "#ffc93c",
                tagInfo: "日常"
              }, {
                color: "lightgreen",
                tagInfo: "生活"
              }],
              isModule: false
            }, {
              name: "吃饭",
              desc: "记得要按时吃饭呀~",
              time: "6:35-7:00",
              tag: [{
                color: "#ffc93c",
                tagInfo: "日常"
              }, {
                color: "lightgreen",
                tagInfo: "生活"
              }],
              isModule: true
            }]
          });

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
var router = new Router();
router.use('/getWhatList', listRouter.routes(), listRouter.allowedMethods());
router.use('/page', error.routes(), error.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/register', register.routes(), register.allowedMethods());
module.exports = router;