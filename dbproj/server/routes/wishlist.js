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
    connection.query("SELECT distinct * FROM product,wishlist where product.pID = wishlist.pID and mID = ?",[user_id], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            console.log(results.length);
            res.send({result: results});
            console.log(results);
            console.log("Sucess solution getBoard "+user_id);
        } 
    });
    /*
            connection.query("SELECT distinct product.pID, product.pIMAGE1 FROM product, wishlist where product.pID = wishlist.pID and wishlist.pID = ?",[results[0].pID], function (err, result1, fid) {
                if (err) throw err;
                if(results.length > 0)
                {
                    const row = [result1]
                    res.send({ result : results, result1 : result1});
                    console.log(results);
                    console.log("값 합치기 : "+row);
                    console.log(row);
                    console.log("Sucess solution getBoard "+user_id);
                }
            });
            for(let i=0; i<results.length; i++)
            {
                connection.query("SELECT distinct product.pID, product.pIMAGE1 FROM product, wishlist where product.pID = wishlist.pID and wishlist.pID = ?",[results[i].pID], function (err, result1, fid) {
                    if (err) throw err;
                    if(results.length > 0)
                    {
                        
                    }
                });
            }
            */
    
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

router.post("/getWishlistImage", function (req, res, next) {
    const product_id = req.query.pid;
    connection.query("SELECT * FROM product WHERE pID = ?",[product_id], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            console.log("Sucess solution getImage "+product_id);
            res.send({result : results});
            console.log(results);
            console.log(results[0].pIMAGE1);
        } 
    });
});
module.exports = router;
