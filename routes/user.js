/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-31 14:11:52
 * @LastEditTime: 2020-04-16 17:33:21
 */
const router = require('koa-router')();
const user = require('../controllers/user');

/**
 * @msg: 获取用户详情
 * @param {type} 
 */
router.get('/empty-item/sysUser/toUserDetails', user.queryUser);
router.post('/empty-item/login', user.setLogin);
router.post('/empty-item/sysUser/userList', user.queryUserList);
router.post('/empty-item/sysUser/saveOrUpdateUser', user.saveOrUpdateUser);
router.post('/empty-item/sysUser/deleteByUser', user.deleteUser);
router.get('/empty-item/sysUser/resetPassword', user.resetPassword);

module.exports = router;

