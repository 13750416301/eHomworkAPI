var express = require('express');
var router = express.Router();
var multer  = require('multer');
var mysql = require('mysql');
var path = require('path');
var cmd = require('node-cmd');

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


// var upload = multer({ dest: 'uploads' })
var storage = multer.diskStorage({
  destination: function(req, res, cb) {
    //cb(null, 'C:/Users/FOREVERBOBO/Downloads/My Documents/二级项目3/api/uploads');
    //cb(null,'D:/test1/destination');
    cb(null, 'C:/Program Files/Apache Software Foundation/Tomcat 8.5/webapps/ROOT/videoWebSite/image');
  },
  filename: function(req, file, cb) {
    var filenameArr = file.originalname.split('.')
    cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
  }
});

var upload = multer({storage});
var src1 = null;
router.post('/', upload.single("image"), function(req, res, next) {
 //得到文件路径
  res.send(req.file);
  var title= req.file.originalname;
  src1 = req.file.filename;
  console.log("filemessage", title);
  // cmd.run('notepad');
  // cmd.run('cd C:\\Program Files\\Apache Software Foundation\\Tomcat 8.5\\webapps\\ROOT\\videoWebSite\\video && notepad');
  res.json({
    filename: src1
  })
  res.send(src1)
  // var sql ='insert into images (title,src1) values("' + title+ '","'+src1+'")';
  // connect.query(sql, function (err, rows, fields) {
  //   if(err){
  //       console.log('INSERT ERROR - ', err.message);
  //       return;
  //   }
  //   console.log("INSERT SUCCESS");
  // });

});

router.get('/', (req, res) => {
  res.json({filename: src1});
})

module.exports = router;