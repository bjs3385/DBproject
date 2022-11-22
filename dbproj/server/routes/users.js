const express = require("express");
const router = express.Router();
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

router.post("/onLogin", function (req, res, next) {
    const user_id = req.query.email;
    const password = req.query.password;
    console.log("user_id: " + user_id + " password: " + password);

    connection.query(
        "SELECT * FROM member WHERE mID = ? AND mPW = ?",
        [user_id, password],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                if (error) throw error;
                if (results[0].mID === user_id && results[0].mPW === password) {
                    const token = jwt.sign({user_id: user_id}, TOKEN_CHECK, {expiresIn: "60m"});
                    res.send({ result: "success", token: token });
                }
                if (password !== results[0].mPW) {
                    res.send({ result: "wrong password" });
                }
            } else if (results.length === 0) {
                res.send({ result: "wrong id" });
            }
        },
    );
});

router.post("/checkEmail", function (req, res, next) {
    const user_id = req.query.email;
    console.log("user_id: " + user_id);
    if (user_id !== "") {
        connection.query("SELECT * FROM member WHERE mID = ?", [user_id], function (error, results, fields) {
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

router.post("/logout", function (req, res) {});

router.post("/onRegister", function (req, res, next) {
    const user_id = req.query.email;
    const password = req.query.password;
    const date = req.query.Date;
    const phone = req.query.phonenum;
    const name = req.query.name;
    const address = req.query.address;

    console.log("user_id: " + user_id + " password: " + password + " date: " + date + " phone: " + phone);
    if (user_id !== "") {
        connection.query("SELECT * FROM member WHERE mID = ?", [user_id], function (error, results, fields) {
            if (error) throw error;
            if (results.length === 0) {
                connection.query(
                    "INSERT INTO member (mID, mPW, mBIRTH, mPHONENUM, mNAME, mADDRESS) VALUES (?, ?, ?, ?, ?, ?)",
                    [user_id, password, date, phone, name, address],
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
