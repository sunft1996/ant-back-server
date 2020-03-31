/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-03-31 16:57:53
 * @LastEditTime: 2020-03-31 18:21:34
 */
const mysql = require('mysql');
const model = require('../models/model');
const connection = mysql.createConnection(model);
connection.connect();


function queryAllMenus() {
    const sql = `SELECT * FROM sys_menu;`
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message)
                reject(err.message);
            }else if (result.length > 0) {
                const string = JSON.stringify(result)
                const data = JSON.parse(string)
                data.forEach((item, index) => {
                    if (item && item.parent_id !== 0) {
                        data.forEach(el => {
                            if (!el.childData) {
                                el.childData = [];
                            }
                            if (item && el.id === item.parent_id) {
                                el.childData.push(item);
                            }
                        });
                    }
                });
                const response = data.filter(item => item.parent_id === 0);
                resolve(response);
            } 

        });
    }).catch(err=>{
        return {
            code: "FAILED",
            msg: err,
        };
    })

}

module.exports = {
    queryAllMenus,
}