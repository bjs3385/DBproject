var express = require("express");
const { connect } = require("http2");
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
router.get("/", function (req, res, next) {
    res.send({ test: "users api success" });
});

/*
email = 아이디
password = 비밀번호

클라이언트의 login 페이지에서 로그인 버튼 클릭시 onLogin으로 아이디 비밀번호 서버로 전달받음

*/

router.post("/onLogin", function (req, res, next) {
    const user_id = req.query.email;
    const password = req.query.password;
    console.log("user_id: " + user_id + " password: " + password);

    connection.query(
        "SELECT * FROM admin WHERE aID = ? AND aPW = ?",
        [user_id, password],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                if (error) throw error;

                if (results[0].aID === user_id && results[0].aPW === password) {
                    res.send({ result: "success" });
                }
            }
            console.log("The solution is: ", results);
            res.send({ data: results.aID });
        },
    );
});
router.post("/checkEmail", function (req, res, next) {
    const user_id = req.query.email;
    console.log("user_id: " + user_id);
    if (user_id !== "") {
        connection.query("SELECT * FROM admin WHERE aID = ?", [user_id], function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                if (error) throw error;
                res.send({ result: false });
            } else {
                res.send({ result: true });
            }
        });
    }
});
router.post("/onRegister", function (req, res, next) {
    const user_id = req.query.email;
    const password = req.query.password;
    const date = req.query.Date;
    const phone = req.query.phone;

    console.log("user_id: " + user_id + " password: " + password + " date: " + date + " phone: " + phone);
    if (user_id !== "") {
        connection.query("SELECT * FROM admin WHERE aID = ?", [user_id], function (error, results, fields) {
            if (error) throw error;
            if (results.length === 0) {
                connection.query(
                    "INSERT INTO admin (aID, aPW, aRDATE) VALUES (?, ?, ?)",
                    [user_id, password, date],
                    function (error, data) {
                        if (error) throw error;
                        console.log("The solution is: ", data);
                        res.send({ test: "회원가입 완료" });
                    },
                );
            } else {
                res.send({ test: "이미 존재하는 아이디입니다." });
            }
        });
    }
});

module.exports = router;
