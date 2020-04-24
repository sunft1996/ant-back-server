/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-31 16:57:53
 * @LastEditTime: 2020-04-23 17:11:57
 */
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');
const userModel = sequelize.define('sys_user', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    loginName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        field: 'login_name'
    },
    password: {
        type: Sequelize.STRING(256),
    },
    realName: {
        type: Sequelize.STRING(256),
        field: 'real_name'
    },
    email: {
        type: Sequelize.STRING(100),
    },
    phone: {
        type: Sequelize.STRING(200),
    },
    mobile: {
        type: Sequelize.STRING(200),
    },
    photo: {
        type: Sequelize.STRING(200),
    },
    loginIp: {
        type: Sequelize.STRING(200),
        field: 'login_ip'
    },
    loginDate: {
        type: Sequelize.DATE,
        field: 'login_date'
    },
    status: {
        type: Sequelize.STRING(200),
    },
    createBy: {
        type: Sequelize.STRING(200),
        field: 'create_by'
    },
    createdAt: {
        type: Sequelize.DATE,
        field: 'create_date'
    },
    updateBy: {
        type: Sequelize.STRING(200),
        field: 'update_by'
    },
    updatedAt: {
        type: Sequelize.DATE,
        field: 'update_date'
    },
    remark: {
        type: Sequelize.STRING(200),
    },
    delFlag: {
        type: Sequelize.STRING(200),
        field: 'del_flag'
    },
    parentId: {
        type: Sequelize.STRING(200),
        field: 'parent_id'
    },
    roleId: {
        type: Sequelize.STRING(200),
        field: 'role_id'
    },
    deletedAt: {
        type: Sequelize.DATE,
        field: 'deletedAt'
    }

}, {
    // 启用时间戳
    timestamps: true,
    // 启用paranoid 删除
    paranoid: true,
    freezeTableName: true,
});

module.exports = userModel;
