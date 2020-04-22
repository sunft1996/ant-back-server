/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-17 11:00:37
 * @LastEditTime: 2020-04-21 17:10:18
 */

const Sequelize = require('sequelize');
const sequelize = require('../config/sequelizeBase');

const roleMenuModel = sequelize.define('sys_role_menu', {
    roleId: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        field: 'role_id'
    },
    menuId: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        allowNull: false,
        field: 'menu_id'
    },

}, {
    // 启用时间戳
    timestamps: false,
    freezeTableName: true,
});

module.exports = roleMenuModel;