var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mysql = require('mysql');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

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

var login = require('./routes/login');
var loginRouter = login.router;
var token = login.token;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getHomeworkList = require('./routes/getHomeworkList');
var getPersonInfo = require('./routes/getPersonInfo');
var getHomeworkDetail = require('./routes/getHomeworkDetial');
var pushAns = require('./routes/pushAns');
var changeEmail = require('./routes/changeEmail');
var changeTelephone = require('./routes/changeTelephone');
var changePassword = require('./routes/changePassword');
var addTemp = require('./routes/addTemp');
var endHomework = require('./routes/endHomework');
var startHomework = require('./routes/startHomework');

//导入api
var getUser = require('./routes/getUser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

//token验证
const secret = 'ABC'; //自定义密钥
// app.use(expressJwt ({
//   secret
// }).unless({
//   path: ['/login']
// }));
// app.use(function(err, req, res, next) {
//   //当token验证失败时会抛出如下错误
//   if(err.name === 'UnauthorizedError') {
//     res.status(401).send('invalid token...');
//   }
// });

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/getUser', getUser);
app.use('/login', loginRouter);
app.use('/getHomeworkList', getHomeworkList);
app.use('/getPersonInfo', getPersonInfo);
app.use('/getHomeworkDetail', getHomeworkDetail);
app.use('/pushAns', pushAns);
app.use('/changeEmail', changeEmail);
app.use('/changeTelephone', changeTelephone);
app.use('/changePassword', changePassword);
app.use('/addTemp', addTemp);
app.use('/endHomework', endHomework);
app.use('/startHomework', startHomework);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.post('/login', (req, res) => {
//   let userName = req.query.userName;
//   let password = req.query.password;
  
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.all('*',function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Credentials','true');
  res.set('Access-Control-Allow-Origin', '127.0.0.1:3000');// 这里前端访问地址
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.send(200); //让options请求快速返回
  }
  else {
    next();
  }
});

module.exports = app;
