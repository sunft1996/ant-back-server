/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-31 14:11:52
 * @LastEditTime: 2020-03-31 18:18:33
 */
const router = require('koa-router')();
const menu = require('../controllers/menu');

/**
 * @msg: 获取用户详情
 * @param {type} 
 */
router.get('/empty-item/sysMenu/menuAllList', menu.queryMenu);
module.exports = router;


