var express = require('express');
const { connect } = require('http2');
var router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "kwonbiver.iptime.org",
    user: "db4",
    password: "password",
    port: 3306,
    database: "db1",
});

connection.connect();
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({test : "users api success"});
});

/*
email = 아이디
password = 비밀번호

클라이언트의 login 페이지에서 로그인 버튼 클릭시 onLogin으로 아이디 비밀번호 서버로 전달받음

*/

router.post('/onLogin', function(req, res, next) {
  const user_id = req.query.email;
  const password = req.query.password;
  console.log("user_id: " + user_id + " password: " + password);

  connection.query("SELECT * FROM admin WHERE aID = ? AND aPW = ?", [user_id, password], function (error, results, fields) {
    if (error) throw error;
    if(results.length > 0){
      if(error) throw error;
        
      
     if(results[0].aID === user_id && results[0].aPW === password){
      res.send({result : "success"});
    }
    }
    console.log("The solution is: ", results);
    res.send({data: results.aID});
    
  });





});

module.exports = router;
