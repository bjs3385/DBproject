var express = require("express");
var router = express.Router();
const connection = require("./db");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("setboard", { title: "Express" });
    res.send({ test: "hi" });
});

router.get("/getBoard", function (req, res, next) {
    connection.query("SELECT * FROM notice", function (error, results, fields) {
        if (error) throw error;
        if(results.length > 0){
            
            res.send({ result: results });
        }
        console.log("Sucess solution getBoard");
    }
);
});

router.post("/setBoard", function (req, res, next) {
    const boardId = req.query.boardId;
    console.log("boardId: " + boardId);
    
    connection.query("SELECT * FROM notice WHERE nID = ?", [boardId], function (error, results, fields) {
        if (error) throw error;
        if(results.length > 0){
            res.send({ result: results });
        }
        console.log("Sucess solution setBoard");
    }
    



);
});

module.exports = router;