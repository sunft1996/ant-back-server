/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-27 17:56:10
 * @LastEditTime: 2020-04-24 17:39:46
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
app.keys = ['sunft handsome!'];
const CONFIG = {
    key: 'sessionId',
    maxAge: 8640000000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: false,
    rolling: false,
    renew: false,
    store: sessionStore
};
app.use(session(CONFIG, app));

// POST
app.use(bodyParser());

const allowApis = ['/empty-item/login','/empty-item/getCaptcha']

/*
 * 请求拦截器
 */
app.use(async (ctx, next) => {
    
    if (allowApis.indexOf(ctx.path) === -1 && !ctx.session.isLogin) {
        // ctx.assert(ctx.state.user, 401, 'User not found. Please login!');
    }
    await next();
});
// 统一放到public中管理
const source = static(`${path.join(__dirname)}/public`);
app.use(source);
// routes
app.use(role.routes(), role.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(menu.routes(), menu.allowedMethods());
app.use(article.routes(), article.allowedMethods());
app.use(api.routes(), api.allowedMethods());

app.listen(4000);
