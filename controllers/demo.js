/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-24 17:12:32
 * @LastEditTime: 2020-05-19 13:24:17
 */
const { demoModel } = require('../models/index');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

// 获取列表
// eslint-disable-next-line max-statements
exports.query = async ctx => {
    const request = ctx.request.body;
    const where = {};
    if (request.remark) {
        where.remark = {
            // 模糊查询
            [Op.like]: `%${request.remark}%`
        };
    }
    if (request.createdAt) {
        where.createdAt = {
            // 模糊查询
            [Op.between]: request.createdAt
        };
    }
    if (request.type) {
        where.type = request.type;
    }
    try {
        const demoList = await demoModel.findAll({
            where
        });
        ctx.status = 200;
        ctx.body = {
            code: 'SUCCESS',
            msg: '查询成功',
            data: demoList
        };
    } catch (error) {
        console.log(error)
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: '查询失败'
        };
    }
}

// 详情
exports.queryDetail = async ctx => {
    const request = ctx.query;
    try {
        const demoList = await demoModel.findOne({
            where: {
                id: request.id
            }
        });
        ctx.status = 200;
        ctx.body = {
            code: 'SUCCESS',
            msg: '查询成功',
            data: demoList
        };
    } catch (error) {
        console.log(error)
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: '查询失败'
        };
    }
}


// 新增或修改
// eslint-disable-next-line max-statements
exports.saveOrUpdate = async ctx => {
    const request = ctx.request.body;
    console.log(request);
    // 修改
    if (request.id) {
        try {
            await demoModel.update({
                title: request.title,
                content: request.content,
                remark: request.remark,
                type: request.type,
            }, {
                where: {
                    id: request.id,
                },
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
            await demoModel.create({
                ...request
            });

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

// 删除
exports.delete = async ctx => {
    const request = ctx.request.body;
    console.log(request);

    try {
        await demoModel.destroy({
            where: {
                id: request.id
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