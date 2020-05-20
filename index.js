/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-27 17:56:10
 * @LastEditTime: 2020-05-20 12:43:36
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const sessionStore = require('./session');
const static = require('koa-static');
const path = require('path');
const app = new Koa();
const role = require('./routes/role');
const user = require('./routes/user');
const menu = require('./routes/menu');
const article = require('./routes/article');
const api = require('./routes/api');
const demo = require('./routes/demo');
app.keys = ['sunft handsome!'];
// session配置
const CONFIG = {
    key: 'sessionId',
    maxAge: 86400,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: false,
    rolling: false,
    renew: false,
    // session存储位置
    store: sessionStore
};
app.use(session(CONFIG, app));

// POST
app.use(bodyParser());

const notLoginApi = ['/empty-item/login', '/empty-item/getCaptcha']

/*
 * 请求拦截器
 */
// eslint-disable-next-line max-statements
app.use(async (ctx, next) => {
    // 未登录
    if (notLoginApi.indexOf(ctx.path) === -1 && !ctx.session.isLogin && !(/\/uploadImg/).test(ctx.path)) {
        ctx.throw(401, '用户未登录');
        return;
    }

    // 请求路径格式化
    let { path } = ctx;
    path = path.replace(/(\w*)\/$/, '$1');
    // 当前接口需要校验权限
    if (ctx.session.isLogin && ctx.session.allAuthApi.indexOf(path) !== -1) {
        // 用户无权限
        if (ctx.session.allowApi.indexOf(ctx.path) === -1) {
            ctx.status = 200;
            ctx.body = {
                code: 'FAILED',
                msg: '无权限'
            }
            return;
        }
    }
    // referer格式化 
    let { referer } = ctx.header;
    referer = referer.replace(/^\w+\:\/\/(\w|\.)+(\:\d+)?/, '');
    referer = referer.replace(/\?.*/, '')
    referer = referer.replace(/(\w*)\/$/, '$1');
    // 用户无页面访问权限
    if (ctx.session.isLogin && ctx.session.allowPage.indexOf(referer) === -1 && path !== '/empty-item/sysUser/toUserDetails') {
        ctx.throw(403, '无权限');
        return;
    }
    await next();
});
// 静态资源统一放到public中管理
const source = static(`${path.join(__dirname)}/public`);
app.use(source);
// routes
app.use(role.routes(), role.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(menu.routes(), menu.allowedMethods());
app.use(article.routes(), article.allowedMethods());
app.use(api.routes(), api.allowedMethods());
app.use(demo.routes(), demo.allowedMethods());

app.listen(4000, () => {
    console.log('4000端口已启动');
});
