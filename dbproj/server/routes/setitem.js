var express = require("express");
var router = express.Router();
const connection = require("./db");

router.get("/", function (req, res, next) {
    res.render("setItem", { title: "Express" });
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

router.post("/getItemCategory", function (req, res, next){
    const category = req.query.productCategory;

    if(category !== "all") {
        connection.query("SELECT * FROM product WHERE pCATEGORY = ?", [category], (err, rows, fields) => {
            if (err) throw err;
            if (rows.length > 0) {
                console.log("success");
                res.send({result: true, rows: rows});
            } else {
                console.log("error");
                res.send({result: false});
            }
        });
    }
    else {
        connection.query("SELECT * FROM product ", (err, rows, fields) => {
            if (err) throw err;
            if (rows.length > 0) {
                console.log("success");
                res.send({result: true, rows: rows});
            } else {
                console.log("error");
                res.send({result: false});
            }
        });
    }
});

router.post("/setItem", function (req, res, next) {
    
    const id = req.query.id;
    console.log(id);

    connection.query("SELECT * FROM product WHERE pID = ?", [id], (err, rows, fields) => {
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
