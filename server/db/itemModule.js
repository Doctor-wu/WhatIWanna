// db/itemModule.js
const mongoose = require('./db');
const crypto = require("crypto");
const Schema = mongoose.Schema;

const whatItemSchema = new Schema({
    itemID: {
        type: String,
        required: [true, 'ItemModuleID不能为空']
    },
    belong: {
        type: String,
        required: [true, 'ItemModule归属人不能为空']
    }
});

const MyModel = mongoose.model('WhatItem', whatItemSchema);

class WhatItemdb {
    constructor() {

    }

    addItem(data) {
        return new Promise((resolve, reject) => {
            const m = new MyModel(data);

            try {
                let error = m.validateSync();
                console.log(error);
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
}
module.exports = new WhatItemdb()