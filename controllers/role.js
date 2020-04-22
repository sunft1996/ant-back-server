/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-25 16:59:23
 * @LastEditTime: 2020-04-22 17:22:14
 */
const { roleMenuModel,roleModel } = require('../models/index');
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');
const { Op } = Sequelize;

// 获取权限列表
// eslint-disable-next-line max-statements
exports.queryRole = async ctx => {
    try {
        const roleList = await roleModel.findAll({
            attributes: ['id', 'description', 'role', [Sequelize.fn('GROUP_CONCAT', Sequelize.col('menu_id')), 'menuId']],
            include: [
                {
                    model: roleMenuModel,
                    attributes: []
                }
            ],
            group: 'id'
        });
        ctx.status = 200;
        ctx.body = roleList;
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
// eslint-disable-next-line max-statements
exports.saveOrUpdateRole = async ctx => {
    const request = ctx.request.body;
    console.log(request);
    // 修改
    if (request.id) {
        try {
            await sequelize.transaction(async t => {
                await roleModel.update({
                    description: request.description,
                }, {
                    where: {
                        id: request.id,

                    },
                    transaction: t
                });
                await roleMenuModel.destroy({
                    where: {
                        roleId: request.id,
                        menuId: {
                            [Op.in]: request.menuIds
                        }
                    },
                    force: true,
                    transaction: t
                });
                const arr = request.menuIds.map(item => {
                    return {
                        roleId: request.id,
                        menuId: item
                    }
                });
                await roleMenuModel.bulkCreate(arr, { transaction: t });
            });
            ctx.status = 200;
            ctx.body = {
                code: 'SUCCESS',
                msg: '修改成功'
            };

        } catch (error) {
            console.error(error)
            ctx.status = 200;
            ctx.body = {
                code: 'FAILED',
                msg: '修改失败'
            };
        }
    } else {
        // 新增
        try {
            const isRoleExit = await roleModel.findOne({
                where: {
                    role: request.role
                }
            })

            if (isRoleExit) {
                ctx.status = 200;
                ctx.body = {
                    code: 'FAILED',
                    msg: '权限已存在'
                };
                return;
            }
            await sequelize.transaction(async t => {
                const addRoleResult = await roleModel.create({
                    description: request.description,
                    role: request.role
                }, { transaction: t });
                const arr = request.menuIds.map(item => {
                    return {
                        roleId: addRoleResult.id,
                        menuId: item
                    }
                })
                await roleMenuModel.bulkCreate(arr, { transaction: t });
            })
            ctx.status = 200;
            ctx.body = {
                code: 'SUCCESS',
                msg: '添加成功'
            };
        } catch (error) {
            console.log(error)
            ctx.status = 200;
            ctx.body = {
                code: 'FAILED',
                msg: '添加失败'
            };
        }
    }

}

exports.deleteRole = async ctx => {
    const request = ctx.request.body;
    console.log(request);

    try {
        await roleModel.destroy({
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