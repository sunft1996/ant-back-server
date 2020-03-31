/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-31 16:57:53
 * @LastEditTime: 2020-03-31 17:44:25
 */
const mysql = require('mysql');
const model = require('../models/model');
const connection = mysql.createConnection(model);
connection.connect();

// 登录
exports.setLogin = request => {
    
    const sql = `SELECT * FROM sys_user WHERE login_name='${request.loginName}';`
    const response = {};
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message)
                reject('用户不存在');
                
            } else if (result.length > 0) {
                const string = JSON.stringify(result)
                const data = JSON.parse(string)
                if (data[0].password !== request.password) {
                    reject("账号或密码不正确！");
                    return;
                }
                Object.assign(response, data[0]);
                response.roleCode = data[0].user_type;
                response.encryptionId = data[0].id;
                resolve(response);
            } else{
                reject('用户不存在');
            }
        });
    }).then((res) => {
        const sql = `SELECT * FROM sys_role WHERE role='${res.user_type}';`
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message)
                    reject();
                } else {
                    const string = JSON.stringify(result)
                    const data = JSON.parse(string)
                    response.roleCode = res.user_type;
                    Object.assign(response, data[0]);
                    resolve(data[0]);
                }
            });
        });
    }).then((res) => {
        const sql = `SELECT menu_id FROM sys_role_menu WHERE role_id=${res.id};`
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message)
                    reject();
                } else {
                    const string = JSON.stringify(result)
                    const data = JSON.parse(string)
                    resolve(data.map(item => item.menu_id));
                }

            });
        });
    }).then((res) => {
        const ids = res.join(' OR id=');
        const sql = `SELECT * FROM sys_menu WHERE id=${ids};`
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message)
                    reject();
                } else {
                    const string = JSON.stringify(result)
                    const data = JSON.parse(string)
                    const menusData = formatMenus(data);
                    response.menuItem = menusData;
                    resolve({
                        code: "SUCCESS",
                        msg: "登录成功！",
                        data: response
                    });
                }
            });
        });
    }).catch(err => {
        return {
            code: "FAILED",
            msg: err,
        };
    })
}


// 获取用户详情
exports.queryUser = request => {
    const sql = `SELECT * FROM sys_user WHERE id='${request.id}';`
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message)
                reject(err.message);
            } else {
                const string = JSON.stringify(result)
                const data = JSON.parse(string)
                resolve({
                    code: "FAILED",
                    msg: "获取用户信息成功",
                    data: data[0]
                });
            }
        });
    }).catch(err => {
        return {
            code: "FAILED",
            msg: err,
        };
    })
}


// 格式化菜单
function formatMenus(menus, id) {
    const newMenus = [];
    // 查子级
    if (id) {
        menus.forEach(item => {
            if (item.parent_id === id) {
                newMenus.push({
                    hideInMenu: item.is_show === '1' ? false : true,
                    path: item.href,
                    routes: formatMenus(menus, item.id),
                    component: item.component,
                    name: item.name,
                });
            }
        })
    } else {
        menus.forEach(item => {
            if (item.parent_id === 0) {
                newMenus.push({
                    hideInMenu: item.is_show === '1' ? false : true,
                    path: item.href,
                    routes: formatMenus(menus, item.id),
                    component: item.component,
                    name: item.name,

                });
            }
        })
    }
    return newMenus;
}
