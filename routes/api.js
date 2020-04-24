/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-24 14:05:52
 * @LastEditTime: 2020-04-24 16:44:12
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

module.exports = router;