/* eslint-disable max-statements */
/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-25 16:59:23
 * @LastEditTime: 2020-04-23 15:09:56
 */
const { roleModel, userModel } = require('../models/index');
const { decrypt } = require('../util')
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');
const moment = require('moment');
const { Op } = Sequelize;

// 登录
exports.setLogin = async ctx => {
    const request = ctx.request.body;
    try {
        const currentUser = await userModel.findOne({
            where: {
                loginName: request.loginName
            },
            include: [
                {
                    model: roleModel,
                }
            ],
        });
        if (!currentUser) {
            throw new Error('用户不存在');
        }
        if (currentUser.password !== request.password) {
            throw new Error('密码不正确');
        }
        const menus = await sequelize.query(`SELECT * from sys_role_menu  a LEFT JOIN sys_menu b ON a.menu_id=b.id where a.role_id=${currentUser.roleId};`, {
            type: sequelize.QueryTypes.SELECT
        })
        const menuItem1 = formatMenus(menus);
        ctx.status = 200;
        ctx.body = {
            code: 'SUCCESS',
            data: {
                id: currentUser.id,
                role: currentUser.sys_role.role,
                loginName: currentUser.loginName,
                loginDate: currentUser.loginDate,
                realName: currentUser.realName,
                menuItem: menuItem1
            },
            msg: '登录成功'
        }
        ctx.session.isLogin = true;
        ctx.session.userId = currentUser.id;

        // 记录本次登录的ip和时间
        await userModel.update({
            loginDate: moment(request.timestamp).format('YYYY-MM-DD HH:MM:SS'),
            loginIp: ctx.request.ip
        }, {
            where: { id: currentUser.id }
        });

    } catch (error) {
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: error.message
        };
    }
}

// 登出
exports.setLogout = ctx => {
    ctx.session.isLogin = false;
    ctx.status = 200;
    ctx.body = {
        code: 'SUCCESS',
        msg: '退出成功',
    };
}

// 获取用户详情
exports.queryUser = async ctx => {
    const request = ctx.query;
    console.log(request);
    try {
        const result = await userModel.findOne({
            where: {
                id: request.id
            },
        });
        ctx.status = 200;
        ctx.body = {
            code: 'SUCCESS',
            msg: '查询用户详情成功',
            data: result,
        };
    } catch (error) {
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: '查询失败'
        };
    }

}

// 获取用户列表
exports.queryUserList = async ctx => {
    const request = ctx.request.body;
    // console.log(request);
    const where = {};
    if (request.loginName) {
        where.loginName = request.loginName;
    }
    if (request.roleId) {
        where.roleId = request.roleId;
    }
    try {
        const userList = await userModel.findAndCountAll({
            where,
            offset: request.pageSize * (request.pageNo - 1),
            limit: request.pageSize,
            order: [['createdAt', 'DESC']],
        });
        userList.total = userList.count;
        delete userList.count;
        ctx.status = 200;
        ctx.body = userList;
    } catch (error) {
        console.log(error)
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: '查询失败'
        };
    }
}


// 新增或修改用户
exports.saveOrUpdateUser = async ctx => {
    const request = ctx.request.body;
    console.log(request);
    // 修改
    if (request.id) {
        try {
            await userModel.update({
                ...request
            }, {
                where: {
                    id: request.id
                }
            });
            ctx.status = 200;
            ctx.body = {
                code: 'SUCCESS',
                msg: '修改成功'
            };
        } catch (error) {
            ctx.status = 200;
            ctx.body = {
                code: 'FAILED',
                msg: '修改失败'
            };
        }
    } else {
        // 新增
        try {
            const isUserExit = await userModel.findOne({
                where: {
                    loginName: request.loginName
                }
            })

            if (isUserExit) {
                ctx.status = 200;
                ctx.body = {
                    code: 'FAILED',
                    msg: '用户已存在'
                };
                return;
            }
            request.password = decrypt(request.password)
            await userModel.create({
                ...request
            });
            ctx.status = 200;
            ctx.body = {
                code: 'SUCCESS',
                msg: '添加成功'
            };
        } catch (error) {
            ctx.status = 200;
            ctx.body = {
                code: 'FAILED',
                msg: '添加失败'
            };
        }
    }

}

exports.deleteUser = async ctx => {
    const request = ctx.request.body;
    console.log(request);

    try {
        await userModel.destroy({
            where: {
                id: {
                    [Op.or]: request
                }
            },
            force: true
        });

        ctx.status = 200;
        ctx.body = {
            code: 'SUCCESS',
            msg: '删除成功'
        };
    } catch (error) {
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: '删除失败'
        };
    }
}

exports.resetPassword = async ctx => {
    const request = ctx.query;
    console.log(request);

    try {
        await userModel.update({
            password: 123456
        }, {
            where: {
                id: request.id
            },
        });

        ctx.status = 200;
        ctx.body = {
            code: 'SUCCESS',
            msg: '密码重置成功'
        };
    } catch (error) {
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: '密码重置失败'
        };
    }
}

exports.editPassword = async ctx => {
    const request = ctx.request.body;
    console.log(request);

    try {
        const currentUser = await userModel.findOne({
            where: {
                id: ctx.session.userId
            },
        });
        if (request.password !== currentUser.password) {
            throw new Error('旧密码不正确')
        }
        await userModel.update({
            password: request.newPassword
        }, {
            where: {
                id: ctx.session.userId
            },
        });
        ctx.status = 200;
        ctx.body = {
            code: 'SUCCESS',
            msg: '密码修改成功'
        };
    } catch (error) {
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: error.message
        };
    }
}


// 格式化菜单
function formatMenus(menus, id) {
    const newMenus = [];
    // 查子级
    if (id) {
        menus.forEach(item => {
            if (item.parent_id === id) {
                newMenus.push({
                    hideInMenu: item.is_show === '1' ? false : true,
                    path: item.href,
                    routes: formatMenus(menus, item.id),
                    component: item.component,
                    name: item.name,
                });
            }
        })
    } else {
        menus.forEach(item => {
            if (item.parent_id === 0) {
                newMenus.push({
                    hideInMenu: item.is_show === '1' ? false : true,
                    path: item.href,
                    routes: formatMenus(menus, item.id),
                    component: item.component,
                    name: item.name,

                });
            }
        })
    }
    return newMenus;
}
