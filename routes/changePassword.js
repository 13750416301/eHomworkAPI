var express = require('express');
var mysql = require('mysql');
var router = express.Router();
// var expressJwt = require('express-jwt');
// var jwt = require('jsonwebtoken');
// const secret = 'ABC'; //自定义密钥
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

router.post('/', (req, res) => {
  let password = req.body.password
  let sql = `UPDATE stuUser SET password='${password}' WHERE userName='16mbcai';`;
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