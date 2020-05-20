/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-24 14:05:52
 * @LastEditTime: 2020-05-20 09:40:19
 */
const router = require('koa-router')();
const api = require('../controllers/api');
const multiparty = require('koa2-multiparty');
const path = require('path');
const option = {
    // 文件大于10mb
    maxFilesSize: 10 * 1024 * 1024,
    uploadDir: path.resolve(__dirname, '../public/uploadImg')

};
router.post('/empty-item/api/uploadImg', multiparty(option), api.uploadImg);
router.post('/empty-item/general/chartList', api.queryChart);
module.exports = router;