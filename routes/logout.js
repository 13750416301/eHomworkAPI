var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var option = {
  // host: 'localhost',
  host: '119.23.46.237',
  user: 'root',
  password: 'admin',
  port: '3306',
  database: 'video_website',
  connectTimeout: 5000,
  multipleStatements: true //支持执行多条sql语句
}

var connect = mysql.createConnection(option);
function Result({code = 0, msg = '200', data = {video: null, images: null, article: null}}) {
  this.code = code;
  this.msg = msg;
  this.data = data;
};

// router.get('/', (req, res) => {
//   connect.query('SELECT * FROM video limit 0,6; SELECT * FROM images limit 0,6; SELECT * FROM article limit 0,3;', (err, result) => res.json(new Result({
//     data: {
//       video: result[0],
//       images: result[1],
//       article: result[2]
//     }
//   })))
// })

router.get('/', (req, res) => {
  res.json({user: 'hahah'})
});

router.post('/', (req, res) =>{
  // connect.query('SELECT authorName from author; SELECT password from author;', (err, result) => {
  //   if((result[0].includes(req.body.username)) && (result[1].includes(req.body.password))) {
  //     res.json({username: req.body.username, password: req.body.password});
  //     res.send('登陆成功！')
  //   } else {
  //     res.json({username: req.body.username, password: req.body.password});
  //     res.json('登陆失败')
  //   }
  // })
  req.session.user = null;
  req.session.error = null;
});

module.exports = router;