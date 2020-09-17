"use strict";

// router/index.js
var crypto = require("crypto");

var Router = require('koa-router'); // 


var User = require('../db/user'); // 子路由2


var page = new Router();
page.get('/404', function _callee(ctx) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          ctx.body = 404;

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
var login = new Router();
login.get('/', function _callee2(ctx) {
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          ctx.body = "login";

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}).post('/', function _callee3(ctx) {
  var data, queryres, pwd;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          data = ctx.request.body;
          _context3.next = 3;
          return regeneratorRuntime.awrap(User.queryCasId(data.casId));

        case 3:
          queryres = _context3.sent;
          console.log(queryres);

          if (queryres) {
            pwd = crypto.createHash("md5").update(data.password || "").digest("hex");

            if (queryres[0].password === pwd) {
              ctx.session.user = queryres[0];
              console.log(ctx.session);
              ctx.body = {
                'code': 1,
                'data': queryres[0],
                'msg': '登录成功'
              };
            } else {
              ctx.body = {
                'code': 0,
                'data': {},
                'msg': '密码错误'
              };
            }
          } else {
            ctx.body = {
              'code': 0,
              'data': {},
              'msg': '没有该用户，去注册吧'
            };
          }

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var register = new Router();
register.get('/', function _callee4(ctx) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          ctx.body = "注册";

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}).post('/', function _callee5(ctx) {
  var data, queryres, valid;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          data = ctx.request.body;
          _context5.next = 3;
          return regeneratorRuntime.awrap(User.queryUsername(data.username));

        case 3:
          queryres = _context5.sent;
          console.log(queryres);

          if (!queryres) {
            _context5.next = 8;
            break;
          }

          ctx.body = {
            'code': 1,
            'data': {},
            'msg': '用户名已存在'
          };
          return _context5.abrupt("return");

        case 8:
          _context5.next = 10;
          return regeneratorRuntime.awrap(User.queryCasId(data.casId));

        case 10:
          queryres = _context5.sent;

          if (!queryres) {
            _context5.next = 14;
            break;
          }

          ctx.body = {
            'code': 1,
            'data': {},
            'msg': '学号已存在'
          };
          return _context5.abrupt("return");

        case 14:
          _context5.next = 16;
          return regeneratorRuntime.awrap(User.save(data));

        case 16:
          valid = _context5.sent;

          if (!(valid && valid.failed)) {
            _context5.next = 22;
            break;
          }

          ctx.body = {
            code: 0,
            data: {},
            'msg': valid.reason.message
          };
          return _context5.abrupt("return");

        case 22:
          ctx.body = {
            'code': 1,
            'data': {},
            'msg': '注册成功'
          };

        case 23:
        case "end":
          return _context5.stop();
      }
    }
  });
}); // 装载所有子路由
// router.use('/page', page.routes(), page.allowedMethods())
// router.use('/login', login.routes(), login.allowedMethods())
// router.use('/register', register.routes(), register.allowedMethods())

module.exports = {
  error: page,
  login: login,
  register: register
};