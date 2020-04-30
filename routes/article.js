/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-24 17:15:27
 * @LastEditTime: 2020-04-26 10:38:53
 */
const router = require('koa-router')();
const article = require('../controllers/article');

router.post('/empty-item/article/saveOrUpdateArticle', article.saveOrUpdateArticle);
router.post('/empty-item/article/articleList', article.queryArticle);
router.post('/empty-item/article/deleteArticle', article.deleteArticle);
router.post('/empty-item/article/detail', article.queryDetail);
module.exports = router;

