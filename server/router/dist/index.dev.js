"use strict";

var router = require('koa-router')();

router.get('/', function _callee(ctx) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ctx.body = "首页";

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get('/getWhatList', function _callee2(ctx, next) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
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
          return _context2.stop();
      }
    }
  });
});
module.exports = router.routes();