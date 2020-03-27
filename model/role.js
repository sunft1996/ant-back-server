/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-02-24 15:18:51
 * @LastEditTime: 2020-03-27 17:35:27
 */

/**
 * @msg: 查询角色列表
 */
const { formatResKey } = require("../util/index");

function queryRole(connection) {
    const sql = `SELECT sr.id, sr.description, sr.role,GROUP_CONCAT(srm.menu_id) as menu_id FROM sys_role sr LEFT JOIN sys_role_menu srm ON sr.id = srm.role_id GROUP BY id;`
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message)
                reject(err);
            } else if (result.length > 0) {
                const string = formatResKey(JSON.stringify(result));
                const data = JSON.parse(string);
                resolve(data);
            }

        });
    }).catch(err => { });

}

function saveOrUpdateRole(req, connection) {
    const sql = `INSERT INTO sys_role (id, description, role) VALUES ('0',?,?);`;
    const params = [req.description, req.role];
    return new Promise((resolve, reject) => {
        connection.query(sql, params, function (err, result) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message)
                reject(err)
            } else {
                console.log(result);
                resolve(result);
            }

        });
    }).then(res => {
        if (res.insertId !== null) {
            let sql;
            let params;
            for (let i = 0; i < req.menuIds.length; i++) {
                if (sql) {
                    sql += `,(?,?)`;
                    params = params.concat([res.insertId, req.menuIds[i]]);
                } else {
                    sql = `INSERT INTO sys_role_menu (role_id1, menu_id) VALUES (?,?)`;
                    params = [res.insertId, req.menuIds[i]];
                }
            }
            return new Promise((resolve, reject) => {
                connection.query(sql, params, function (err, result) {
                    if (err) {
                        console.log('[INSERT ERROR] - ', err.message)
                        reject(err);
                    } else {
                        console.log(result);
                        resolve({
                            code: 'SUCCESS',
                            msg: '创建角色成功'
                        });
                    }
                  
                });
            })
        }
    }).catch(err => {
        console.log('err')
    })

}



module.exports = {
    queryRole,
    saveOrUpdateRole
}