const {
    error,
    login,
    register,
    avatar
} = require("./user");
const Router = require('koa-router');


const listRouter = new Router();
listRouter.get('/', async(ctx, next) => {
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


const router = new Router();
router.use('/getWhatList', listRouter.routes(), listRouter.allowedMethods());
router.use('/page', error.routes(), error.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/register', register.routes(), register.allowedMethods());
router.use('/changeAvatar', avatar.routes(), avatar.allowedMethods());


module.exports = router;