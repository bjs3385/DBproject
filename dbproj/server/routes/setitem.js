var express = require("express");
var router = express.Router();
const connection = require("./db");

router.get("/", function (req, res, next) {
    res.render("setboard", { title: "Express" });
    res.send({ test: "hi" });
});

router.get("/getItem", function (req, res, next) {
    console.log("getItem");
    connection.query("SELECT * FROM product", (err, rows, fields) => {
        if (err) throw err;
        if (rows.length > 0) {
            console.log("success");
            res.send({ result: true, rows: rows });
        } else {
            console.log("error");
            res.send({ result: false });
        }
    });
});

module.exports = router;
