/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-31 14:11:52
 * @LastEditTime: 2020-05-20 10:41:50
 */
const router = require('koa-router')();
const role = require('../controllers/role');

router.post('/empty-item/role/saveOrUpdateRole', role.saveOrUpdateRole);
router.post('/empty-item/role/roleList', role.queryRole);
router.post('/empty-item/role/deleteById', role.deleteRole);
module.exports = router;

