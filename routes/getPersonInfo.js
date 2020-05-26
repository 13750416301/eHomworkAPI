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
function Result({code = 0, msg = '200', data = {video: null, images: null, article: null}}) {
  this.code = code;
  this.msg = msg;
  this.data = data;
};

router.get('/', (req, res) => {
  let sql = `SELECT * from stuUser where userName="16mbcai";`;
  console.log('sql: ' + sql);
  connect.query(sql, (err, data) => {
    if(err) {
      throw err;
    }
    if(data.length) {
      console.log('data: ' + data);
      res.json(new Result({
        data: data
      }))
    } else {
      res.send({code: 1, reason: '请检查用户名或密码'})
    }
  })
});

module.exports = router;