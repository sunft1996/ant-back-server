/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-31 16:57:53
 * @LastEditTime: 2020-04-26 17:19:07
 */
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');

const menuModel = sequelize.define('sys_menu', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    code: {
        type: Sequelize.STRING(255),
        allowNull: false,
    },
    sort: {
        type: Sequelize.BIGINT,
    },
    href: {
        type: Sequelize.STRING(100),
    },
    target: {
        type: Sequelize.STRING(20),
    },
    isShow: {
        type: Sequelize.BIGINT,
        field: 'is_show'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'create_date'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'update_date'
    },
    remark: {
        type: Sequelize.STRING(200),
    },
    resourceType: {
        type: Sequelize.STRING(20),
        field: 'resource_type'
    },
    parentId: {
        type: Sequelize.BIGINT,
        field: 'parent_id'
    },
    deletedAt: {
        type: Sequelize.DATE,
        field: 'deletedAt'
    },
    apiUrl: {
        type: Sequelize.STRING(255),
    }

}, {
    // 启用时间戳
    timestamps: true,
    // 启用paranoid 删除
    paranoid: true,
    freezeTableName: true,
});



module.exports = menuModel;