/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-24 17:15:27
 * @LastEditTime: 2020-04-30 15:14:15
 */
const router = require('koa-router')();
const demo = require('../controllers/demo');

router.post('/empty-item/demo/saveOrUpdate', demo.saveOrUpdate);
router.post('/empty-item/demo/list', demo.query);
router.post('/empty-item/demo/delete', demo.delete);
router.get('/empty-item/demo/detail', demo.queryDetail);
module.exports = router;

