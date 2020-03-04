var express = require('express');
var mysql = require('mysql');
var router = express.Router();
// var session = require('express-session');

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
  // var userName = req.query.userName;
  // console.log(userName);
  // if(userName === '') {
	//   connect.query('SELECT * FROM user;', (err, result) => res.json(new Result({
	// 	data: result
	//   })))
  // } else {
	//   connect.query('SELECT * FROM user where userName="' + userName + '";', (err, result) => res.json(new Result({
	// 	data: result
	//   })))
  // }
  connect.query('SELECT * FROM user;', (err, result) => {
    console.log('error: ' + err);
    res.json(new Result({
      data: result
    }))
  })
})

module.exports = router;