var express = require("express");
var router = express.Router();
const connection = require("./db");


/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("setWishlist", { title: "Express" });
    res.send({ test: "hi" });
});

router.post("/getWishlist", function (req, res, next) {
    const user_id = req.query.email;
    connection.query("SELECT * FROM wishlist WHERE mID = ?",[user_id], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            console.log(results.length);
            console.log("Sucess solution getBoard "+user_id);
            res.send({result : results });
            /*connection.query("SELECT * FROM productwhere pID = ?;",[results[1].pID], function (err, res, fid) {
                if (err) throw err;
                if (res.length > 0) {
                    res.send({ res : res});
                    console.log(results);
                    console.log(res);
                    console.log("Sucess solution getBoard "+user_id);
                } 
            });*/
        } 
    });
});

router.post("/setWishlist", function (req, res, next) {
    connection.query("SELECT * FROM wishlist WHERE mID = ?", [user_id], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ result: results });
        }
        console.log("Sucess solution setBoard");
    });
});

router.post("/deleteWishlist", function (req, res, next) {
    const user_id = req.query.mid;
    const product_id = req.query.pid;
    console.log("replyId: " + user_id+"  "+product_id);

    connection.query("DELETE FROM wishlist WHERE mID = ? and pID = ?", [user_id,product_id], function (error, results, fields) {
        if (error) throw error;
        console.log("Sucess solution deleteCart");
    });
});
module.exports = router;