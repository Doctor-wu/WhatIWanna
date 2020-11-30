// db/itemModule.js
const mongoose = require('./db');
const crypto = require("crypto");
const Schema = mongoose.Schema;

const whatModuleSchema = new Schema({
    itemID: {
        type: String,
        required: [true, 'ItemModuleID不能为空']
    },
    belong: {
        type: String,
        required: [true, 'ItemModule归属人不能为空']
    }
});

const MyModel = mongoose.model('WhatModule', whatModuleSchema);
const ItemDB = require('./whatItem');

class WhatModuledb {
    constructor() {

    }

    addModule(data) {
        return new Promise(async(resolve, reject) => {
            const m = new MyModel(data);
            try {
                let error = m.validateSync();
                console.log(error);
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
            await ItemDB.find({belong}, (err, res) => {
                if (err) {
                    reject(err)
                }
                resolve(res);
            })
        })
    }
}
module.exports = new WhatModuledb()
