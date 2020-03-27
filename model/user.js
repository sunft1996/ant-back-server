// 获取单个用户信息
function setLogin(req, connection) {
    const sql = `SELECT * FROM sys_user WHERE login_name='${req.loginName}';`
    const response = {};
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message)
                reject();
            } else if (result.length > 0) {
                const string = JSON.stringify(result)
                const data = JSON.parse(string)
                Object.assign(response, data[0]);
                response.roleCode = data[0].user_type;
                response.encryptionId = data[0].id;
                resolve(data[0]);
            } 

        });
    }).then((res) => {
        const sql = `SELECT * FROM sys_role WHERE role='${res.user_type}';`
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message)
                    reject();
                }else{
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
                }else{
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
                }else{
                    const string = JSON.stringify(result)
                    const data = JSON.parse(string)
                    const menusData = formatMenus(data);
                    response.menuItem = menusData;
                    resolve(response);
                }
            });
        });
    }).catch(err => {})
}

function queryUser(req, connection) {
    const sql = `SELECT * FROM sys_user WHERE id='${req.id}';`
    const response = {};
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message)
                reject(err);
            }else{
                const string = JSON.stringify(result)
                const data = JSON.parse(string)
                resolve(data[0]);
            }
        });
    }).catch(err=>{})
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

module.exports = {
    setLogin: setLogin,
    queryUser: queryUser
};

