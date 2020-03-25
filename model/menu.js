/*
 * @Descripttion: 
 * @Author: sunft
 * @Date: 2020-02-24 15:18:51
 * @LastEditTime: 2020-03-18 15:33:26
 */
function queryAllMenus(connection) {
    const sql = `SELECT * FROM sys_menu;`
    return new Promise((resolve, reject) => {
        connection.query(sql, function (err, result) {
            if (err) {
                console.log('[SELECT ERROR] - ', err.message)
                return;
            }
            if (result.length > 0) {
                const string = JSON.stringify(result)
                const data = JSON.parse(string)
                data.forEach((item,index)=>{
                    if(item && item.parent_id !== 0){
                        data.forEach(el => {
                            if(!el.childData){
                                el.childData = [];
                            }
                            if(item && el.id === item.parent_id){
                                el.childData.push(item);
                            }
                        });
                    }
                });
                const response = data.filter(item=>item.parent_id === 0);    
                resolve(response);
            } else {
                reject()
            }

        });
    });

}

module.exports = {
    queryAllMenus
}