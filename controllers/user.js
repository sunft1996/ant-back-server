const user = require('../models/user')

// 登录
exports.setLogin = async ctx => {
    const request = ctx.request.body;
    const data = await user.setLogin(request);
    ctx.status = 200;
    if (data.code === "SUCCESS") {
        ctx.session.isLogin = true;
    } 
    ctx.body = data;
}

// 获取用户详情
exports.queryUser = async ctx => {
    const request = ctx.query;
    console.log(request);
    const data = await user.queryUser(request);
    ctx.status = 200;
    ctx.body = data;
}

