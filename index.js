/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-27 17:56:10
 * @LastEditTime: 2020-03-31 18:39:32
 */
/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2019-12-24 16:35:27
 * @LastEditTime: 2020-03-31 16:29:07
 */

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const sessionStore = require('./session');

const app = new Koa();
const role = require('./routes/role');
const user = require('./routes/user');
const menu = require('./routes/menu');

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

/*
 * 请求拦截器
 * app.use(async (ctx,next)=>{
 */
    
/*
 *     if(ctx.originalUrl !== '/empty-item/login'){
 *         ctx.assert(ctx.state.user, 401, 'User not found. Please login!');
 *     }
 *     // await next();
 * });
 */

// routes
app.use(role.routes(), role.allowedMethods());
app.use(user.routes(), user.allowedMethods());
app.use(menu.routes(), menu.allowedMethods());


app.listen(4000);
