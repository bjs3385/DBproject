var express = require("express");
var router = express.Router();
const connection = require("./db");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("setCart", { title: "Express" });
    res.send({ test: "hi" });
});

router.post("/getCart", function (req, res, next) {
    const user_id = req.query.email;
    connection.query("SELECT * FROM cart WHERE mID = ?",[user_id], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ result: results });
            console.log(results);
            console.log("Sucess solution getBoard "+user_id);
        }
        
    });
});

router.post("/setCart", function (req, res, next) {
    connection.query("SELECT * FROM cart WHERE mID = ?", [user_id], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ result: results });
        }
        console.log("Sucess solution setBoard");
    });
});

router.post("/deleteCart", function (req, res, next) {
    const user_id = req.query.mid;
    const product_id = req.query.pid;
    console.log("replyId: " + user_id+"  "+product_id);

    connection.query("DELETE FROM cart WHERE mID = ? and pID = ?", [user_id,product_id], function (error, results, fields) {
        if (error) throw error;
        console.log("Sucess solution deleteCart");
    });
});
router.post("/updateCart", function (req, res, next) {
    const user_id = req.query.mid;
    const product_id = req.query.pid;
    const quantity = req.query.qty;
    console.log("replyId: " + quantity +" "+user_id+" "+product_id);

    connection.query("UPDATE cart SET cQTY = ? WHERE mID = ? and pID = ?", [quantity,user_id,product_id], function (error, results, fields) {
        if (error) throw error;
        console.log("Sucess solution deleteCart");
    });
});
module.exports = router;