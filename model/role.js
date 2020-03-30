/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-02-24 15:18:51
 * @LastEditTime: 2020-03-30 15:48:29
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
        connection.beginTransaction(err => {
            if (err) { reject(err); }
            else {
                resolve();
            }
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, function (err, result) {
                if (err) {
                    connection.rollback(() => {
                        console.log('[INSERT ERROR] - ', err.message)
                        reject(err);
                    });
                } else {
                    console.log(result);
                    resolve(result);
                }

            });
        })
    }).then(res => {
        if (res.insertId !== null) {
            let sql;
            let params;
            for (let i = 0; i < req.menuIds.length; i++) {
                if (sql) {
                    sql += `,(?,?)`;
                    params = params.concat([res.insertId, req.menuIds[i]]);
                } else {
                    sql = `INSERT INTO sys_role_menu (role_id, menu_id) VALUES (?,?)`;
                    params = [res.insertId, req.menuIds[i]];
                }
            }
            return new Promise((resolve, reject) => {
                if(!sql){
                    resolve({
                        code: 'SUCCESS',
                        msg: '创建角色成功'
                    });
                    return;
                }
                connection.query(sql, params, function (err, result) {
                    if (err) {
                        connection.rollback(() => {
                            console.log('[INSERT ERROR] - ', err.message)
                            reject(err);
                        });
                    } else {
                        connection.commit((err) => {
                            if (err) {
                                connection.rollback(() => {
                                    console.log('[commit ERROR] - ', err.message)
                                    reject(err);
                                });
                            } else {
                                console.log(result);
                                resolve({
                                    code: 'SUCCESS',
                                    msg: '创建角色成功'
                                });
                            }
                        })
                    }
                });
            })
        }
    }).catch(err => {
    })
}


function updateRole(req, connection) {
    const sql = `UPDATE sys_role set description=(?),role=(?) WHERE id=${req.id};`;
    const params = [req.description, req.role];
    return new Promise((resolve, reject) => {
        connection.beginTransaction(err => {
            if (err) { reject(err); }
            else {
                resolve();
            }
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, function (err, result) {
                if (err) {
                    connection.rollback(() => {
                        console.log('[UPDATE ERROR] - ', err.message)
                        reject(err);
                    });
                } else {
                    console.log(result);
                    resolve(result);
                }

            });
        })
    }).then(() => {
        const sql = `DELETE from sys_role_menu WHERE role_id=${req.id};`;
        return new Promise((resolve, reject) => {
            connection.query(sql, function (err, result) {
                if (err) {
                    connection.rollback(() => {
                        console.log('[DELETE ERROR] - ', err.message)
                        reject(err);
                    });
                } else {
                    console.log(result);
                    resolve();
                }
            });
        })
    }).then(() => {
        let sql;
        let params;
        for (let i = 0; i < req.menuIds.length; i++) {
            if (sql) {
                sql += `,(?,?)`;
                params = params.concat([req.id, req.menuIds[i]]);
            } else {
                sql = `INSERT INTO sys_role_menu (role_id, menu_id) VALUES (?,?)`;
                params = [req.id, req.menuIds[i]];
            }
        }
        return new Promise((resolve, reject) => {
            if(!sql){
                resolve({
                    code: 'SUCCESS',
                    msg: '修改角色成功'
                });
                return;
            }
            connection.query(sql,params, function (err, result) {
                if (err) {
                    connection.rollback(() => {
                        console.log('[INSERT ERROR] - ', err.message)
                        reject(err);
                    });
                } else {
                    connection.commit((err) => {
                        if (err) {
                            connection.rollback(() => {
                                console.log('[commit ERROR] - ', err.message)
                                reject(err);
                            });
                        } else {
                            console.log(result);
                            resolve({
                                code: 'SUCCESS',
                                msg: '修改角色成功'
                            });
                        }
                    })
                }
            });
        })
    }).catch(err => {
    })
}

function deleteRole(req, connection) {
    const params = req;
    let ids = '?';
    for (let i = 1; i < req.length; i++) {
        ids += ',?';
    }
    const sql = `DELETE from sys_role WHERE id IN (${ids});`
    return new Promise((resolve, reject) => {
        connection.beginTransaction(err => {
            if (err) {
                console.log(err)
                reject();
            } else {
                resolve()
            }
        })
    }).then(() => {
        return new Promise((resolve, reject) => {
            connection.query(sql, params, function (err, result) {
                if (err) {
                    console.log('[DELETE ERROR] - ', err.message)
                    reject(err);
                } else {
                    resolve(result);
                }

            });
        })
    }).then((result) => {
        const sql = `DELETE from sys_role_menu WHERE role_id IN (${ids});`
        return new Promise((resolve, reject) => {
            connection.query(sql, params, function (err, result) {
                if (err) {
                    connection.rollback(() => {
                        console.log('[DELETE ERROR] - ', err.message)
                        reject(err);
                    })
                } else {
                    resolve({
                        code: 'SUCCESS',
                        msg: '删除角色成功'
                    });
                }

            });
        })
    }).catch(err => { });
}



module.exports = {
    queryRole,
    saveOrUpdateRole,
    deleteRole,
    updateRole
}