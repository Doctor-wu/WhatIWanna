"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// db/user.js
var mongoose = require('./db');

var crypto = require("crypto");

var Schema = mongoose.Schema;
var userSchema = new Schema({
  casId: {
    type: String,
    required: [true, '学号不能为空'],
    validate: {
      validator: function validator(v) {
        return /^20\d{10}$/.test(v);
      },
      message: function message(props) {
        return "".concat(props.value, " \u4E0D\u662F\u6B63\u786E\u7684\u5B66\u53F7!");
      }
    },
    unique: [true, "学号已存在"]
  },
  username: {
    type: String,
    required: [true, '用户名不能为空'],
    unique: [true, "用户名已存在"]
  },
  password: {
    type: String,
    required: [true, '密码不能为空']
  }
});
var MyModel = mongoose.model('User', userSchema);

var Userdb =
/*#__PURE__*/
function () {
  function Userdb() {
    _classCallCheck(this, Userdb);
  } // 查询


  _createClass(Userdb, [{
    key: "query",
    value: function query() {
      var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new Promise(function (resolve, reject) {
        MyModel.find(obj, function (err, res) {
          if (err) {
            reject(err);
          }

          resolve(res);
        });
      });
    }
  }, {
    key: "queryCasId",
    value: function queryCasId(id) {
      return new Promise(function (resolve, reject) {
        MyModel.find({
          casId: id
        }, function (err, res) {
          if (err) {
            reject(err);
          }

          var len = res.length;

          if (len >= 1) {
            // 存在
            resolve(res);
          } else {
            // 不存在
            resolve(null);
          }
        });
      });
    }
  }, {
    key: "queryUsername",
    value: function queryUsername(name) {
      return new Promise(function (resolve, reject) {
        MyModel.find({
          username: name
        }, function (err, res) {
          if (err) {
            reject(err);
          }

          var len = res.length;

          if (len >= 1) {
            // 存在
            resolve(res);
          } else {
            // 不存在
            resolve(null);
          }
        });
      });
    } // 保存

  }, {
    key: "save",
    value: function save(obj) {
      obj.password = crypto.createHash("md5").update(obj.password).digest("hex");
      return new Promise(function (resolve, reject) {
        var m = new MyModel(obj);

        try {
          var error = m.validateSync();
        } catch (e) {
          reject(e);
          return;
        }

        m.save(function (err, res) {
          if (err) {
            reject(err);
          }

          resolve(res);
        });
      })["catch"](function (e) {
        return {
          failed: true,
          reason: e
        };
      });
    }
  }]);

  return Userdb;
}();

module.exports = new Userdb();