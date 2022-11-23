var express = require("express");
const { connect } = require("http2");
var router = express.Router();
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const TOKEN_CHECK = "secret";

const connection = require("./db");


/* GET users listing. */
router.get("/", function (req, res, next) {
    res.send({ test: "users api success" });
});

/*
email = 아이디
password = 비밀번호

클라이언트의 login 페이지에서 로그인 버튼 클릭시 onLogin으로 아이디 비밀번호 서버로 전달받음

*/

router.post("/onDelete", function (req, res, next) {
    const user_id = req.query.email;
    console.log("user_id: " + user_id);
    connection.query(
        "SELECT * FROM member WHERE mID = ?",
        [user_id],
        function (error, results, fields) {
            if (error) throw error;
            if(results.length > 0 ){
                connection.query("DELETE FROM member WHERE mID = ?", [user_id], function (err, val, arr) {
                   console.log(user_id + " Delete Success");
                });
            } else console.log("fail");
        },
    );
});

router.post("/token", function (req, res, next) {
    const token = req.query.token;
    const id = req.query.id;

    const decoded = jwt.verify(token, TOKEN_CHECK);
    console.log(decoded);
    if (decoded.user_id === id) {
        res.send({ result: "success" });
    } else {
        res.send({ result: "wrong token" });
    }
});

module.exports = router;
