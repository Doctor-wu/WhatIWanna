// router/index.js
const crypto = require("crypto");
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

// 
const User = require('../db/user')

// 子路由2
const page = new Router()

page.get('/404', async(ctx) => {
    ctx.body = 404;
})


const login = new Router()

login.get('/', async(ctx) => {
    ctx.body = "login";
}).post('/', async(ctx) => {
    const data = ctx.request.body;
    if (!data.casId) {
        ctx.body = {
            'code': 0,
            'data': {},
            'msg': '用户名[学号]不能为空!'
        };
        return;
    }
    if (!data.password) {
        ctx.body = {
            'code': 0,
            'data': {},
            'msg': '密码不能为空!'
        };
        return;
    }
    let queryres = await User.queryCasId(data.casId);
    // console.log(queryres);
    if (queryres) {
        let pwd = crypto.createHash("md5").update(data.password || "").digest("hex");
        if (queryres[0].password === pwd) {
            ctx.session.user = queryres[0];
            ctx.body = {
                'code': 1,
                'data': queryres[0],
                'msg': '登录成功'
            }
        } else {
            ctx.body = {
                'code': 0,
                'data': {},
                'msg': '密码错误'
            }
        }

    } else {
        ctx.body = {
            'code': 0,
            'data': {},
            'msg': '没有该用户，用户名需要输入注册时的学号噢'
        }
    }
})

const register = new Router()

register.get('/', async(ctx) => {
    ctx.body = "注册";
}).post('/', async(ctx) => {
    const data = ctx.request.body;

    let queryres = await User.queryUsername(data.username);
    console.log(queryres)
    if (queryres) {
        ctx.body = {
            'code': 0,
            'data': {},
            'msg': '用户已存在'
        }
        return;
    }
    queryres = await User.queryCasId(data.casId);
    if (queryres) {
        ctx.body = {
            'code': 0,
            'data': {},
            'msg': '学号已存在'
        }
        return;
    }
    let valid = await User.save(data);
    if (valid && valid.failed) {
        ctx.body = {
            code: 0,
            data: {},
            'msg': valid.reason.message
        }
        return;
    } else {
        ctx.body = {
            'code': 1,
            'data': {},
            'msg': '注册成功'
        }
    }

});

const avatar = new Router();
avatar.get('/', async(ctx) => {
    ctx.body = "上传头像";
}).post('/', async(ctx) => {
    var form = new formidable.IncomingForm();
    var static = path.join(__dirname, '../../public/');
    if (!fs.existsSync(static)) {
        fs.mkdir(static, function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
    form.uploadDir = static; //文件保存的临时目录为static文件夹（文件夹不存在会报错，一会接受的file中的path就是这个）
    form.maxFieldsSize = 1 * 1024 * 1024; //用户头像大小限制为最大1M    
    form.keepExtensions = true; //使用文件的原扩展名  
    await new Promise((resolve, reject) => {

        form.parse(ctx.req, async function(err, fields, file) {
            var filePath = '';
            //如果提交文件的form中将上传文件的input名设置为tmpFile，就从tmpFile中取上传文件。否则取for in循环第一个上传的文件。  
            if (file.tmpFile) {
                filePath = file.tmpFile.path;
            } else {
                for (var key in file) {
                    if (file[key].path && filePath === '') {
                        filePath = file[key].path;
                        break;
                    }
                }
            }
            //文件移动的目录文件夹，不存在时创建目标文件夹  
            var targetDir = path.join(__dirname, '../../public/avatars');
            if (!fs.existsSync(targetDir)) {
                fs.mkdir(targetDir, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
            var fileExt = filePath.substring(filePath.lastIndexOf('.'));
            //判断文件类型是否允许上传  
            if (('.jpg.jpeg.png.gif').indexOf(fileExt.toLowerCase()) === -1) {
                ctx.body = {
                    code: 0,
                    data: {},
                    msg: `[${fileExt.toLowerCase()}]此文件类型不允许上传`
                };
                resolve();
            } else {
                //以当前时间戳对上传文件进行重命名  
                var fileName = new Date().getTime() + ctx.session.user._id.slice(4) + fileExt;
                var targetFile = path.join(targetDir, fileName);
                //移动文件  
                await fs.rename(filePath, targetFile, async function(err) {
                    if (err) {
                        console.info(err);
                        ctx.body = {
                            code: 0,
                            data: {},
                            msg: '操作失败'
                        };
                        resolve();
                    } else {
                        let user = await User.query({
                            _id: ctx.session.user._id
                        });

                        if (user[0] && user[0].avatar) {
                            fs.unlink(path.join(targetDir, user[0].avatar), function(err) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log("删除旧头像");
                            })
                        }
                        await User.updateAvatar({
                            _id: ctx.session.user._id
                        }, {
                            avatar: fileName
                        }, (err2, doc2) => {
                            if (err2) {
                                console.log(err2);
                                ctx.body = {
                                    code: 0,
                                    data: err2,
                                    msg: "上传失败"
                                };
                                resolve();
                            } else {
                                ctx.body = {
                                    code: 1,
                                    data: fileName,
                                    msg: "上传成功"
                                }
                                resolve();
                            }
                        })
                    }
                });
            }
        });

    })
});
// 装载所有子路由
// router.use('/page', page.routes(), page.allowedMethods())
// router.use('/login', login.routes(), login.allowedMethods())
// router.use('/register', register.routes(), register.allowedMethods())


module.exports = {
    error: page,
    login: login,
    register: register,
    avatar: avatar
}