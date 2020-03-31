/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-02-24 15:18:51
 * @LastEditTime: 2020-03-31 18:19:34
 */
const menu = require('../models/menu')
// 请求权限列表
exports.queryMenu = async ctx => {
    const request = ctx.request.body;
    const data = await menu.queryAllMenus(request);
    ctx.status = 200;
    if (data.code === "SUCCESS") {
        ctx.session.isLogin = true;
    } 
    ctx.body = data;
}
