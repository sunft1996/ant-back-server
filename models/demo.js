/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-24 17:14:46
 * @LastEditTime: 2020-05-19 13:23:40
 */

const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');

// 对应数据库中demo表的字段
const demoModel = sequelize.define('demo', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    url: {
        type: Sequelize.BIGINT,
    },
    type: {
        type: Sequelize.STRING(255),
    },
    remark: {
        type: Sequelize.STRING(255),
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'create_date'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'update_date'
    },
}, {
    // 启用时间戳
    timestamps: true,
    freezeTableName: true,
});

module.exports = demoModel;

