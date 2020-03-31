/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-31 14:11:52
 * @LastEditTime: 2020-03-31 17:53:51
 */
const router = require('koa-router')();
const user = require('../controllers/user');

/**
 * @msg: 获取用户详情
 * @param {type} 
 */
router.get('/empty-item/sysUser/toUserDetails', user.queryUser);
router.post('/empty-item/login', user.setLogin);

module.exports = router;

