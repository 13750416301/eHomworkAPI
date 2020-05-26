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
function Result({code = 0, msg = '200', data = {}}) {
  this.code = code;
  this.msg = msg;
  this.data = data;
};

router.post('/', (req, res) => {
  let ansData = req.body.ansData;
  console.log(ansData)
  // for (let i = 0; i < ansData.length; ++i) {
  //   for (let key in ansData[i]) {
  //     if (ansData[i][key] == null) {
  //       ansData[i][key] = ''
  //     }
  //   }
  // }
  let subjectId = ansData.subjectId;
  let homeworkId = ansData.homeworkId;
  let type = ansData.type;
  let point = ansData.point;
  let description = ansData.description;
  let optionAns = ansData.optionAns;
  let optionA = ansData.optionA;
  let optionB = ansData.optionB;
  let optionC = ansData.optionC;
  let optionD = ansData.optionD;
  let multiAns = ansData.multiAns;
  let multiA = ansData.multiA;
  let multiB = ansData.multiB;
  let multiC = ansData.multiC;
  let multiD = ansData.multiD;
  let shortAns = ansData.shortAns;
  let userAns = ansData.userAns;
  let sql = `Insert into templist(subjectId,homeworkId,type,point,description,optionAns,optionA,optionB,optionC,optionD,multiAns,multiA,multiB,multiC,multiD,shortAns,userAns) values('${subjectId}','${homeworkId}','${type}','${point}','${description}','${optionAns}','${optionA}','${optionB}','${optionC}','${optionD}','${multiAns}','${multiA}','${multiB}','${multiC}','${multiD}','${shortAns}','${userAns}');`;
  console.log('sql: ' + sql);
  connect.query(sql, (err, data) => {
    if (err) {
      throw err;
    }
    let sql2 = `select * from templist;`
    connect.query(sql2, (err, data) => {
      if (err) {
        throw err;
      }
      console.log('data: ' + data)
      res.json(new Result({
        data: data
      }))
    })
  });
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