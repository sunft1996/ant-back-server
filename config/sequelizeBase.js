/* eslint-disable */
/* sequelize基础配置文件 */
const Sequelize = require('sequelize');
const sequelize = new Sequelize('common', 'root', '123456', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = sequelize;