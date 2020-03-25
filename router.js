var router = require("express").Router()
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test'
});
connection.connect();
// 获取mysql数据并展示在页面
router.get('/list', function (req, res) {
    var sql = 'SELECT * FROM  textItems'
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message)
            return;
        }
        // console.log(result)
        var string = JSON.stringify(result)
        // console.log(string)
        var data = JSON.parse(string)
        console.log(data)
        res.json({ code: 0, data: data })

    });
})
// 往mysql中增加记录
router.post('/process_add', function (req, res) {
    var string = JSON.stringify(req.body)
    console.log(string+"----------------------这是string-------------------------------")
    var data = JSON.parse(string)
    console.log(data+"----------------------这是data-------------------------------")
    var  addSql = 'INSERT INTO textItems(Id,text,completed) VALUES(0,?,?)'
    var  addSqlParams = [data.text, 'false'];
    // 增
    connection.query(addSql,addSqlParams,function (err, result) {
            if(err){
             console.log('[INSERT ERROR] - ',err.message);
             return
            }        
            console.log(result)
           
    })
    //查询新增记录
    var sql = 'SELECT * FROM  textItems'
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message)
            return;
        }
        // console.log(result)
        var string1 = JSON.stringify(result)
        // console.log(string)
        var data1 = JSON.parse(string1)
        console.log(data1)
        res.json({ code: 0, data: data1 })

    });

})

// 往mysql中删除记录
router.post('/process_delete', function (req, res) {  
    var string = JSON.stringify(req.body)
    console.log(string+"----------------------这是string-------------------------------")
    var data = JSON.parse(string)
    console.log(data+"----------------------这是data-------------------------------")
    var  delSql = "DELETE FROM textItems where Id=" + data.id
    // 删
    connection.query(delSql,function (err, result) {
            if(err){
             console.log('[DELETE ERROR] - ',err.message)
             return
            }        
            console.log(result)
            res.json({ code: 0, data: "删除成功"})
    })

})

// 修改任务时mysql更新记录
router.post('/process_edit', function (req, res) {  
    var string = JSON.stringify(req.body)
    console.log(string+"----------------------这是string-------------------------------")
    var data = JSON.parse(string)
    console.log(data+"----------------------这是data-------------------------------")
    var modSql = 'UPDATE textItems SET text = ? WHERE Id = ?'
    var modSqlParams = [data.text,data.id]
    // 更新
    connection.query(modSql,modSqlParams,function (err, result) {
            if(err){
             console.log('[EDIT ERROR] - ',err.message)
             return
            }        
            console.log(result)
            res.json({ code: 0, data: "数据更新成功"})
    })

})

// 完成任务时mysql更新记录
router.post('/process_finish', function (req, res) {  
    var string = JSON.stringify(req.body)
    console.log(string+"----------------------这是string-------------------------------")
    var data = JSON.parse(string)
    console.log(data+"----------------------这是data-------------------------------")
    var modSql = 'UPDATE textItems SET completed = ? WHERE Id = ?'
    var modSqlParams = [data.completed,data.id]
    // 更新
    connection.query(modSql,modSqlParams,function (err, result) {
            if(err){
             console.log('[FINISH ERROR] - ',err.message)
             return
            }        
            console.log(result)
            res.json({ code: 0, data: "数据更新成功"})
    })

})

module.exports = router