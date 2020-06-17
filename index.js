/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-04-01 10:22:58
 * @LastEditTime: 2020-06-17 10:47:06
 */ 
/* eslint-disable */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const sessionStore = require('./session');
const static = require('koa-static');
const path = require('path');
const role = require('./routes/role');
const user = require('./routes/user');
const menu = require('./routes/menu');
const article = require('./routes/article');
const api = require('./routes/api');
const demo = require('./routes/demo');
const notLoginApi = ['/empty-item/login', '/empty-item/getCaptcha']
const source = static(`${path.join(__dirname)}/public`);
const app = new Koa();

// session
app.keys = ['sunft handsome!'];

const CONFIG = {
    key: 'sessionId',
    maxAge: 86400000,
    autoCommit: true,
    overwrite: true,
    httpOnly: true,
    signed: false,
    rolling: false,
    renew: false,
    store: sessionStore
};

app.use(session(CONFIG, app));
app.use(bodyParser());

// 请求拦截
app.use(async (ctx, next) => {
    
    if (notLoginApi.indexOf(ctx.path) === -1 && !ctx.session.isLogin && !(/\/uploadImg/).test(ctx.path)) {
        ctx.throw(401, '用户未登录');
        return;
    }

    let { path } = ctx;
    
    path = path.replace(/(\w*)\/$/, '$1');
    
    // 当前接口需要校验权限
    if (ctx.session.isLogin && ctx.session.allAuthApi.indexOf(path) !== -1) {
        
        // 无接口访问权限
        if (ctx.session.allowApi.indexOf(ctx.path) === -1) {
            ctx.status = 200;
            ctx.body = {
                code: 'FAILED',
                msg: '无权限'
            }
            return;
        }
    }

    let { referer } = ctx.header;

    referer = referer.replace(/^\w+\:\/\/(\w|\.)+(\:\d+)?/, '');
    referer = referer.replace(/\?.*/, '')
    referer = referer.replace(/(\w*)\/$/, '$1');

    // 无页面访问权限
    if (ctx.session.isLogin && ctx.session.allowPage.indexOf(referer) === -1 && path !== '/empty-item/sysUser/toUserDetails') {
        ctx.throw(403, '无权限');
        return;
    }

    await next();
});

// 静态资源
app.use(source);

// 路由
app.use(role.routes(), role.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(menu.routes(), menu.allowedMethods());
app.use(article.routes(), article.allowedMethods());
app.use(api.routes(), api.allowedMethods());
app.use(demo.routes(), demo.allowedMethods());

app.listen(4000, () => {
    console.log('4000端口已启动');
});
