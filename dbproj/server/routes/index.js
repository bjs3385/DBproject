var express = require("express");
var router = express.Router();
const connection = require("./db");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
    res.sender({ test: "hi" });
});

module.exports = router;
