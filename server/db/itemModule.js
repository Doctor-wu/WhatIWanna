// db/itemModule.js
const mongoose = require('./db');
const crypto = require("crypto");
const Schema = mongoose.Schema;

const whatModuleSchema = new Schema({
    belong: {
        type: String,
        required: [true, 'ItemModule归属人不能为空']
    },

    title: {
        type: String,
        required: [true, 'ItemModule标题不能为空']
    },
    desc: {
        type: String,
        required: [true, 'ItemModule描述不能为空']
    },
    startTime: {
        type: String,
        required: [true, 'ItemModule开始时间不能为空']
    },
    endTime: {
        type: String,
        required: [true, 'ItemModule结束时间不能为空']
    },
    date: {
        type: String,
        required: [true, 'ItemModule所属日期不能为空']
    },
    tag: {
        type: String,
        required: [true, "ItemModule需要至少一个tag"]
    }
});

const MyModel = mongoose.model('WhatModule', whatModuleSchema);
const ItemDB = require('./whatItem');

class WhatModuledb {
    constructor() {

    }

    addModule(data) {
        return new Promise(async(resolve, reject) => {
            delete data._id;
            const m = new MyModel(data);
            try {
                let error = m.validateSync();
                await ItemDB.updateItemModule(data.itemID, true);
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
            throw new Error({
                failed: true,
                reason: e
            });
        })
    }

    removeModule(id) {
        return new Promise(async(resolve, reject) => {
            try {
                await ItemDB.updateItemModule(id, false);
                MyModel.remove({ itemID: id }, function(err) {
                    if (err) {
                        reject(err);
                    }
                    resolve("删除模板成功");
                })
            } catch (e) {
                console.log(e);
                reject("删除模板失败");
            }
        })
    }


    getModules(belong) {
        return new Promise(async (resolve, reject) => {
            await MyModel.find({belong}, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res);
            })
        })
    }
}
module.exports = new WhatModuledb()
