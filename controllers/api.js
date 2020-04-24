/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-24 14:07:08
 * @LastEditTime: 2020-04-24 17:01:16
 */
const fs = require('fs');
const path = require('path');

// eslint-disable-next-line max-statements
exports.uploadImg = async ctx => {
    try {
        const { file } = ctx.req.files;
        // 文件不是image
        if (!(/^image/).test(file.type)) {
            // 删除文件
            fs.unlink(file.path, (err) => {
                if (err) { throw err; }
                console.log('文件已删除');
            });
            throw new Error('请上传正确的图片类型');
        }
        // 文件重命名
        const newName = `${new Date().getTime()}_${file.name}`;
        fs.renameSync(file.path,path.resolve(file.path,`../${newName}`))
        ctx.status = 200;
        ctx.body = {
            code: 'SUCCESS',
            data: {
                url: `/uploadImg/${newName}`
            },
            msg: '文件上传成功'
        };
    } catch (error) {
        ctx.status = 200;
        ctx.body = {
            code: 'FAILED',
            msg: error.message
        };
    }

}