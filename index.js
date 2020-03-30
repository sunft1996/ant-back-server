/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2019-12-24 16:35:27
 * @LastEditTime: 2020-03-30 17:11:05
 */

const Koa = require('koa');
const mount = require('koa-mount');
const mysql = require('mysql');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const sessionStore = require('./session');
const { setLogin, queryUser } = require('./model/user');
const { queryAllMenus } = require('./model/menu');
const { queryRole, saveOrUpdateRole,deleteRole,updateRole } = require('./model/role');
const app = new Koa();

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    database: 'common'
});
connection.connect();

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

// GET
app.use(mount('/empty-item/sysUser/toUserDetails', async ctx => {
    ctx.assert(ctx.session.isLogin, 401, 'Please login!');

    const request = ctx.query;
    console.log(request);
    const data = await queryUser(request, connection);
    ctx.status = 200;
    if (data) {
        // ctx.session.isLogin = true;
        ctx.body = {
            code: "SUCCESS",
            msg: "获取用户信息成功",
            data,
        };;
    } else {
        ctx.body = {
            code: "FAILED",
            msg: "获取用户信息失败",
        };
    }
}));
/**
 * @msg: 权限管理，获取所有权限
 */
app.use(mount('/empty-item/sysMenu/menuAllList', async ctx => {
    ctx.assert(ctx.session.isLogin, 401, 'Please login!');

    const request = ctx.query;
    console.log(request);
    const data = await queryAllMenus(connection);
    ctx.status = 200;
    if (data) {
        ctx.body = data;
    } else {
        ctx.body = {
            code: "FAILED",
            msg: "获取菜单列表失败",
        };
    }
}));

// POST
app.use(bodyParser());

/**
 * @msg: 登录
 */
app.use(mount('/empty-item/login', async ctx => {
    const request = ctx.request.body;
    console.log(request);
    const data = await setLogin(request, connection);
    ctx.status = 200;
    if (data && data.password === request.password) {
        ctx.session.isLogin = true;
        ctx.body = {
            code: "SUCCESS",
            msg: "登陆成功",
            data,
        };
    } else {
        ctx.body = {
            code: "FAILED",
            msg: "账号或密码错误",
        };
    }
}));

/**
 * @msg: 角色列表
 * @page: 权限管理
 */
app.use(mount('/empty-item/role/roleList', async ctx => {
    ctx.assert(ctx.session.isLogin, 401, 'Please login!');

    const request = ctx.request.body;
    console.log(request);
    const data = await queryRole(connection);
    ctx.status = 200;
    if (data) {
        ctx.body = data;
    } else {
        ctx.body = {
            code: "FAILED",
            msg: "获取角色列表失败",
        };
    }
}));

/**
 * @msg: 新增角色
 * @page: 权限管理
 */
app.use(mount('/empty-item/role/saveOrUpdateRole', async ctx => {
    ctx.assert(ctx.session.isLogin, 401, 'Please login!');

    const request = ctx.request.body;
    console.log(request);
    const data = !request.id ? await saveOrUpdateRole(request,connection) : await updateRole(request,connection);
    ctx.status = 200;
    if (data) {
        ctx.body = data;
    } else {
        ctx.body = {
            code: "FAILED",
            msg: !request.id ? "新增角色失败" :"修改角色失败",
        };
    }
}));

/**
 * @msg: 删除角色
 * @page: 权限管理
 */
app.use(mount('/empty-item/role/deleteById', async ctx => {
    ctx.assert(ctx.session.isLogin, 401, 'Please login!');

    const request = ctx.request.body;
    console.log(request);
    const data = await deleteRole(request,connection);
    ctx.status = 200;
    if (data) {
        ctx.body = data;
    } else {
        ctx.body = {
            code: "FAILED",
            msg: "删除角色失败",
        };
    }
}));

app.listen(4000);
