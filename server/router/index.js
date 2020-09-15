const router = require('koa-router')();

router.get('/', async(ctx) => {
    ctx.body = "首页";
});



router.get('/getWhatList', async(ctx, next) => {
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
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
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
            }
        ]
    })
})

module.exports = router.routes();