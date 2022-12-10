const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const port = 4000;
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");
const boardRouter = require("./routes/setboard");
const itmeRouter = require("./routes/setitem");
const connection = require("./routes/db");
const deleteRouter = require("./routes/delete");
const cartRouter = require("./routes/cart");
const wishlistRouter = require("./routes/wishlist");
const fs = require("fs");
const multer = require("multer");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", apiRouter);
app.use("/setboard", boardRouter);
app.use("/setitem", itmeRouter);
app.use("/delete", deleteRouter);
app.use("/cart", cartRouter);
app.use("/wishlist", wishlistRouter);



app.use("/image", express.static("image"));

app.get("/image/:imageName", function (req, res) {
    console.log("get image");
    const imageName = req.params.imageName;
    console.log(imageName);
    const readStream = fs.createReadStream('./dbproj/server/image/${imageName}');
    readStream.pipe(res);
});



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;
