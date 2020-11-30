// db/user.js
const mongoose = require('./db');
const crypto = require("crypto");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    casId: {
        type: String,
        required: [true, '学号不能为空'],
        validate: {
            validator: function(v) {
                return /^20\d{10}$/.test(v);
            },
            message: props => `${props.value} 不是正确的学号!`
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
    },
    avatar: {
        type: String
    }
});

const MyModel = mongoose.model('User', userSchema);

class Userdb {
    constructor() {

        }
        // 查询
    query(obj = {}) {
        return new Promise((resolve, reject) => {
            MyModel.find(obj, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        })
    }
    queryCasId(id) {
        return new Promise((resolve, reject) => {
            MyModel.find({ casId: id }, (err, res) => {
                if (err) {
                    reject(err)
                }
                const len = res.length
                if (len >= 1) {
                    // 存在
                    resolve(res)
                } else {
                    // 不存在
                    resolve(null)
                }
            })
        })
    }
    queryUsername(name) {
            return new Promise((resolve, reject) => {
                MyModel.find({ username: name }, (err, res) => {
                    if (err) {
                        reject(err)
                    }
                    const len = res.length
                    if (len >= 1) {
                        // 存在
                        resolve(res)
                    } else {
                        // 不存在
                        resolve(null)
                    }
                })
            })
        }
        // 保存
    save(obj) {
        obj.password = crypto.createHash("md5").update(obj.password).digest("hex");
        return new Promise((resolve, reject) => {
            const m = new MyModel(obj);

            try {
                let error = m.validateSync();
            } catch (e) {
                reject(e);
                return;
            }
            m.save((err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res)
            })
        }).catch(e => {
            return {
                failed: true,
                reason: e
            };
        })

    }

    // 更新头像
    updateAvatar(conditions, doc, callback) {
        MyModel.updateOne(conditions, doc, callback);
    }
}
module.exports = new Userdb()