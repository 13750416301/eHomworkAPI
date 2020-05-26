var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var token = '';
var option = {
  host: 'localhost',
  user: 'root',
  password: '1063706696',
  port: '3306',
  database: 'ehomework',
  connectTimeout: 5000,
  multipleStatements: true //支持执行多条sql语句
}

var connect = mysql.createConnection(option);
function Result({code = 0, msg = '200', data = {}}) {
  this.code = code;
  this.msg = msg;
  this.data = data;
};

router.get('/', (req, res) => {
  let sql = `UPDATE homeworklist SET status=3 WHERE id=1;`;
  console.log('sql: ' + sql);
  connect.query(sql, (err, data) => {
    if(err) {
      throw err;
    }
    console.log('data: ' + data);
    res.json(new Result({
      data: data
    }))
  })
});

module.exports = router;