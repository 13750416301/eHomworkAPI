var express = require('express');
var mysql = require('mysql');
var router = express.Router();
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

router.post('/', (req, res) => {
  let ansData = req.body.ansData;
  console.log(ansData)
  for (let i = 0; i < ansData.length; ++i) {
    let subjectId = ansData[i].subjectId;
    let homeworkId = ansData[i].homeworkId;
    let type = ansData[i].type;
    let point = ansData[i].point;
    let description = ansData[i].description;
    let optionAns = ansData[i].optionAns;
    let optionA = ansData[i].optionA;
    let optionB = ansData[i].optionB;
    let optionC = ansData[i].optionC;
    let optionD = ansData[i].optionD;
    let multiAns = ansData[i].multiAns;
    let multiA = ansData[i].multiA;
    let multiB = ansData[i].multiB;
    let multiC = ansData[i].multiC;
    let multiD = ansData[i].multiD;
    let shortAns = ansData[i].shortAns;
    let userAns = ansData[i].userAns;
    let sql = `Insert into answerlist(subjectId,homeworkId,type,point,description,optionAns,optionA,optionB,optionC,optionD,multiAns,multiA,multiB,multiC,multiD,shortAns,userAns) values('${subjectId}','${homeworkId}','${type}','${point}','${description}','${optionAns}','${optionA}','${optionB}','${optionC}','${optionD}','${multiAns}','${multiA}','${multiB}','${multiC}','${multiD}','${shortAns}','${userAns}');`;
    console.log('sql: ' + sql);
    connect.query(sql);
  }
  let homeworkId = ansData[0].homeworkId;
  let sql2 = `UPDATE homeworklist SET status=2 WHERE homeworkId=${homeworkId};`;
  console.log('sql2: ' + sql2);
  connect.query(sql2);
  res.json(new Result({
    data: {}
  }))
  // console.log('sql: ' + sql);
  // connect.query(sql, (err, data) => {
  //   if(err) {
  //     throw err;
  //   }
  //   if(data.length) {
  //     console.log('data: ' + data);
  //     res.json(new Result({
  //       data: data
  //     }))
  //   } else {
  //     res.send({code: 1, reason: '请检查用户名或密码'})
  //   }
  // })
});

module.exports = router;