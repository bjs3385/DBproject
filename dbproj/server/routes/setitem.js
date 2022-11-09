var express = require("express");
var router = express.Router();
const connection = require("./db");

router.get("/", function (req, res, next) {
    res.render("setboard", { title: "Express" });
    res.send({ test: "hi" });
});

router.post("/getItem", function(req, res, next) {
    const boardId = req.query.boardId;
    console.log("boardId: " + boardId);
});

module.exports = router;