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
        console.log("Sucess solution getCart");
    });
});

router.post("/setCart", function (req, res, next) {
    const boardId = req.query.boardId;
    console.log("boardId: " + boardId);

    connection.query("SELECT * FROM notice WHERE nID = ?", [boardId], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ result: results });
        }
        console.log("Sucess solution setBoard");
    });
});

module.exports = router;