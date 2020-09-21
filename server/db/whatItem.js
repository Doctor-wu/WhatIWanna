// db/whatItem.js
const mongoose = require('./db');
const crypto = require("crypto");
const Schema = mongoose.Schema;

const whatItemSchema = new Schema({
    title: {
        type: String,
        required: [true, 'whatItem标题不能为空']
    },
    isModule: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        required: [true, 'whatItem描述不能为空']
    },
    startTime: {
        type: String,
        required: [true, 'whatItem开始时间不能为空']
    },
    endTime: {
        type: String,
        required: [true, 'whatItem结束时间不能为空']
    },
    belong: {
        type: String,
        required: [true, 'whatItem归属人不能为空']
    },
    date: {
        type: String,
        required: [true, 'whatItem所属日期不能为空']
    },
    tag: {
        type: String,
        required: [true, "whatItem需要至少一个tag"]
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
                if (error) {
                    reject(error);
                }
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

    getItem(belong, date) {
        return new Promise((resolve, reject) => {
            let query = MyModel.find({
                belong,
                date
            }, function(err, raw) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log(raw);
                resolve(raw);
            })
        })
    }
}
module.exports = new WhatItemdb()