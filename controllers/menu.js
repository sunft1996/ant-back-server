/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-02-24 15:18:51
 * @LastEditTime: 2020-04-21 17:07:56
 */
const { menuModel } = require('../models/index');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

exports.queryMenu = async ctx => {
    try {
        const menuList = await menuModel.findAndCountAll();
        const result = formatMenus(menuList.rows);
        ctx.status = 200;
        ctx.body = result;
    } catch (error) {
        console.log(error)
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: '查询失败'
        };
    }
}
exports.queryMenuList = async ctx => {
    try {
        const menuList = await menuModel.findAndCountAll();
        menuList.total = menuList.count;
        menuList.rows = formatMenus(menuList.rows);
        delete menuList.count;
        ctx.status = 200;
        ctx.body = menuList;
    } catch (error) {
        console.log(error)
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: '查询失败'
        };
    }
}

// eslint-disable-next-line max-statements
exports.saveOrUpdateMenu = async ctx => {
    const request = ctx.request.body;
    if (request.id) {
        try {
            await menuModel.update({
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
            const isUserExit = await menuModel.findOne({
                where: {
                    code: request.code
                }
            })

            if (isUserExit) {
                ctx.status = 200;
                ctx.body = {
                    code: 'FAILED',
                    msg: '菜单编码已存在'
                };
                return;
            }
            await menuModel.create({
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

exports.deleteMenu = async ctx => {
    const request = ctx.request.body;
    console.log(request);

    try {
        await menuModel.destroy({
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

// 格式化菜单
function formatMenus(menus, id) {
    let newMenus = [];
    // 查子级
    if (id) {
        menus.forEach(item => {
            if (item.parentId === id) {
                newMenus.push({
                    hideInMenu: item.isShow === '1' ? false : true,
                    href: item.href,
                    code: item.code,
                    remark: item.remark,
                    resourceType: item.resourceType,
                    parentId: item.parentId,
                    sort: item.sort,
                    id: item.id,
                    childData: formatMenus(menus, item.id),
                    // component: item.component,
                    name: item.name,
                });
            }
        })
        if (newMenus.length === 0) { newMenus = null; }
    } else {
        menus.forEach(item => {
            if (item.parentId === 0) {
                newMenus.push({
                    hideInMenu: item.isShow === '1' ? false : true,
                    href: item.href,
                    code: item.code,
                    remark: item.remark,
                    resourceType: item.resourceType,
                    parentId: item.parentId,
                    sort: item.sort,
                    id: item.id,
                    childData: formatMenus(menus, item.id),
                    // component: item.component,
                    name: item.name,

                });
            }
        })
    }
    return newMenus;
}