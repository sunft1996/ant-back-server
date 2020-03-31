/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-31 14:11:52
 * @LastEditTime: 2020-03-31 18:13:46
 */
const router = require('koa-router')();
const role = require('../controllers/role');

/**
 * @msg: 获取用户详情
 * @param {type} 
 */
router.post('/empty-item/role/saveOrUpdateRole', role.saveOrUpdateRole);
router.post('/empty-item/role/roleList', role.queryRole);
router.post('/empty-item/role/deleteById', role.deleteRole);
module.exports = router;

