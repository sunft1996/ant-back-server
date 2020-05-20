/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-24 14:07:08
 * @LastEditTime: 2020-05-20 12:00:02
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


// 详情
exports.queryChart = async ctx => {
    const list = [
        {
            time: "2020-05-18",
            type: "1",
            amount: 102000,
            num: 303
        },
        {
            time: "2020-05-19",
            type: "1",
            amount: 131000,
            num: 200
        },
        {
            time: "2020-05-20",
            type: "1",
            amount: 83000,
            num: 400
        },
        {
            time: "2020-05-21",
            type: "1",
            amount: 137000,
            num: 30
        },
        {
            time: "2020-05-22",
            type: "1",
            amount: 61000,
            num: 99
        },
        {
            time: "2020-05-23",
            type: "1",
            amount: 100000,
            num: 230
        },
        {
            time: "2020-05-24",
            type: "1",
            amount: 50000,
            num: 130
        }
    ];
    ctx.status = 200;
    ctx.body = {
        code: 'SUCCESS',
        msg: '查询成功',
        data: list
    };
}