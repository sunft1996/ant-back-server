/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-31 14:11:52
 * @LastEditTime: 2020-04-17 10:50:03
 */
const router = require('koa-router')();
const menu = require('../controllers/menu');

router.get('/empty-item/sysMenu/menuAllList', menu.queryMenu);
router.post('/empty-item/sysMenu/menuList', menu.queryMenuList);
router.post('/empty-item/sysMenu/saveOrUpdateMenu', menu.saveOrUpdateMenu);
router.post('/empty-item/sysMenu/deleteByMenu', menu.deleteMenu);

module.exports = router;


