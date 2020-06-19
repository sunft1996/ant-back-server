/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-24 17:12:32
 * @LastEditTime: 2020-05-18 15:30:29
 */
const { articleModel } = require('../models/index');
const Sequelize = require('sequelize');
const { Op } = Sequelize;

// 获取列表
// eslint-disable-next-line max-statements
exports.queryArticle = async ctx => {
    const request = ctx.request.body;
    const where = {};
    const columnKey = request.columnKey || 'createdAt';
    let order;
    switch (request.order) {
        case 'descend':
            order = 'DESC';
            break;
        case 'ascend':
            order = 'ASC';
            break;
        default:
            order = 'DESC';
            break;
    }
    if (request.title) {
        where.title = {
            // 模糊查询标题
            [Op.like]: `%${request.title}%`
        };
    }
    if (request.type) {
        where.type = request.type;
    }
    try {
        const articleList = await articleModel.findAll({
            where,
            order: [[columnKey, order]],
        });
        
        ctx.status = 200;
        ctx.body = {
            code: 'SUCCESS',
            msg: '查询成功',
            data: articleList
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
    const request = ctx.request.body;
    try {
        const articleList = await articleModel.findOne({
            where: {
                id: request.id
            }
        });
        ctx.status = 200;
        ctx.body = {
            code: 'SUCCESS',
            msg: '查询成功',
            data: articleList
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
exports.saveOrUpdateArticle = async ctx => {
    const request = ctx.request.body;
    console.log(request);
    // 修改
    if (request.id) {
        try {
            await articleModel.update({
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
            await articleModel.create({
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

exports.deleteArticle = async ctx => {
    const request = ctx.request.body;
    console.log(request);

    try {
        await articleModel.destroy({
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