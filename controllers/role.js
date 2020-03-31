/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-25 16:59:23
 * @LastEditTime: 2020-03-31 18:15:02
 */
const role = require('../models/role')

// 请求权限列表
exports.queryRole = async ctx => {
    const request = ctx.request.body;
    const data = await role.queryRole(request);
    ctx.status = 200;
    if (data.code === "SUCCESS") {
        ctx.session.isLogin = true;
    } 
    ctx.body = data;
}

// 新增或修改权限
exports.saveOrUpdateRole = async ctx => {
    const request = ctx.request.body;
    console.log(request);
    const data = request.id ? await role.updateRole(request) : await role.saveOrUpdateRole(request);
    ctx.status = 200;
    ctx.body = data;
}

// 删除权限
exports.deleteRole = async ctx => {
    const request = ctx.request.body;
    console.log(request);
    const data = await role.deleteRole(request);
    ctx.status = 200;
    ctx.body = data;
}
