var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
const secret = 'ABC'; //自定义密钥
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
  let userName = req.query.userName;
  let password = req.query.password;
  let sql = `SELECT * from stuUser where userName='${userName}' and password='${password}';`;
  console.log('sql: ' + sql);
  connect.query(sql, (err, data) => {
    if(err) {
      throw err;
    }
    if(data.length) {
      console.log('data: ' + data);
      token = jwt.sign(Object.assign({}, data[0]), secret, {
        expiresIn: 60 * 60 * 2 //过期时间
      })
      res.json(new Result({
        data: data
      }))
      console.log('token: ' + token);
    } else {
      res.send({code: 1, reason: '请检查用户名或密码'})
    }
  })
});

// router.post('/', (req, res) => {
//   let userName = req.body.userName;
//   let password = req.body.password;
//   let sql = `SELECT * from stuUser where userName='${userName}' and password='${password}';`;
//   console.log('sql: ' + sql);
//   connect.query(sql, (err, data) => {
//     if(err) {
//       throw err;
//     }
//     if(data.length) {
//       console.log('data: ' + data);
//       token = jwt.sign(Object.assign({}, data[0]), secret, {
//         expiresIn: 60 * 60 * 2 //过期时间
//       })
//       res.json(new Result({
//         data: data
//       }))
//       console.log('token: ' + token);
//     } else {
//       res.send({code: 1, reason: '请检查用户名或密码'})
//     }
//   })
// });

exports.router = router;
exports.token = token;