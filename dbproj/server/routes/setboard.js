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
        if (results.length > 0) {

            res.send({ result: results });
        }
        console.log("Sucess solution getBoard");
    });
});

router.post("/setBoard", function (req, res, next) {
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

router.post("/getItemReply", function (req, res, next) {
    const boardId = req.query.boardId;
    console.log("boardId: " + boardId);

    connection.query("SELECT * FROM reply WHERE pID = ?", [boardId], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ result: results });
        }
        console.log("Sucess solution getReply");
    });
});

router.post("/getNoticeReply", function (req, res, next) {
    const boardId = req.query.boardId;
    console.log("boardId: " + boardId);

    connection.query("SELECT * FROM reply WHERE nID = ?", [boardId], function (error, results, fields) {
        if (error) throw error;
        if (results.length > 0) {
            res.send({ result: results });
        }
        console.log("Sucess solution getReply");
    });
});

router.post("/deleteReply", function (req, res, next) {
    const replyId = req.query.id;
    console.log("replyId: " + replyId);

    connection.query("DELETE FROM reply WHERE rID = ?", [replyId], function (error, results, fields) {
        if (error) throw error;
        console.log("Sucess solution deleteReply");
        res.send({result: "sucess"});
    });
});

router.post("/createReply", function (req, res, next ){

    const boardId = req.query.boardId;
    const text = req.query.text;
    const id = req.query.id;

    console.log("replyId : " + boardId + " Id : " + id);

    connection.query("INSERT INTO reply (nID, rREPLY, mID, pID) VALUES (?, ?, ?, ?)", [boardId, text, id, boardId], function (err, result, fields){
       if(err) throw err;
       console.log(result);
       res.send({ result: result });

    });

});
module.exports = router;
