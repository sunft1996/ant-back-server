/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-24 17:14:46
 * @LastEditTime: 2020-04-24 18:07:48
 */

const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');

const articleModel = sequelize.define('article', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING(255),
    },
    type: {
        type: Sequelize.BIGINT,
    },
    remark: {
        type: Sequelize.STRING(255),
    },
    content: {
        type: Sequelize.TEXT,
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
    /*
     * 启用paranoid 删除
     * paranoid: true,
     */
    freezeTableName: true,
});

module.exports = articleModel;

