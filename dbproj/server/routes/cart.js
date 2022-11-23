var express = require("express");
var router = express.Router();
const connection = require("./db");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("setCart", { title: "Express" });
    res.send({ test: "hi" });
});

router.get("/getCart", function (req, res, next) {
    connection.query("SELECT * FROM cart", function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ result: results });
        }
        console.log("Sucess solution getBoard");
    });
});

router.post("/setCart", function (req, res, next) {
    const user_id = "admin";
    console.log(user_id);
    connection.query("SELECT * FROM cart WHERE mID = ?", [user_id], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ result: results });
        }
        console.log("Sucess solution setBoard");
    });
});

module.exports = router;