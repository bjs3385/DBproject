const express = require("express");
const cors = require("cors");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require("multer");
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

router.post("/insertWishlist", function (req, res, next){
    const id = req.query.id;
    const product = req.query.product;

    connection.query("SELECT * FROM wishlist WHERE pID = ?", [product], (err, rows, fields) => {
        if (err) throw err;
        if (rows.length > 0) {
            console.log("fail");
            res.send({ result: false});
        } else {
            connection.query("INSERT INTO wishlist (mID, pID) VALUES (?, ?)", [id, product], function (err, result, fields){
                if(err) throw err;
                console.log(result);
                res.send({ result: result });
            });
        }
    });



});

router.post("/deleteWishlist", function (req, res, next){
    const id = req.query.id;
    const product = req.query.product;

    connection.query("SELECT * FROM wishlist WHERE pID = ?", [product], (err, rows, fields) => {
        if (err) throw err;
        if (rows.length > 0) {
            connection.query("DELETE FROM wishlist WHERE pID = ?", [product], function (error, results, fields) {
            if (error) throw error;
            console.log("Sucess solution delete Wishlist");
            res.send({result: "sucess"});
            });
        } else {
            res.send({ result: false});
        }
    });


})

router.post("/insertCart", function (req, res, next){
    const id = req.query.id;
    const product = req.query.product;
    connection.query("SELECT * FROM cart WHERE pID = ?", [product], (err, rows, fields) => {
        if (err) throw err;
        if (rows.length > 0) {
            console.log("fail");
            res.send({ result: false});
        } else {
            connection.query("INSERT INTO cart (mID, pID) VALUES (?, ?)", [id, product], function (err, result, fields){
                if(err) throw err;
                console.log(result);
                res.send({ result: result });
            });
        }
    });



})

router.post("/getOrderList", function (req, res, next) {
    const id = req.query.id;
    console.log("getOrderList");
    connection.query("SELECT distinct * FROM product,orders where product.pID = orders.pID and orders.mID = ?", [id], (err, rows, fields) =>{
        if(err)throw err;
        if(rows.length>0){
            console.log("success");
            res.send({result: true, rows: rows});
        }
    });
})

router.post("/setOrderlist", function (req, res, next) {
    const productId = req.query.pID;
    const memberId = req.query.id;
    let name;
    let phoneNum;
    let address;
    console.log("setOrderlist");
    connection.query("SELECT * FROM member WHERE mID = ?", [memberId], (err, rows, fields) =>{
        if(err) throw err;
        if(rows.length>0){
            name = rows[0].mNAME;
            phoneNum = rows[0].mPHONENUM;
            address = rows[0].mADDRESS;
        }
    });

    connection.query("SELECT * FROM product WHERE pID = ?", [productId], (err, rows, fields) =>{
        if(err) throw err;
        const item = rows[0];
        connection.query("INSERT INTO orders (mID, pID, oNAME, oPHONENUM, oADDRESS, oPRICE, oQTY, oDATE) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [memberId, productId, name, phoneNum, address, item.pPRICE, 1, new Date()], (err, rows, fields) =>{
            if(err) throw err;
            res.send({
                result : true
            });
        });
    });
});


const upload = multer({
    storage: multer.diskStorage({
        destination: 'image'
        , filename: function (req, file, cb) {
            console.log("?");
            console.log(file);
            const ext = path.extname(file.originalname);
            cb(null, Date.now() + ext);
        },
    }),
    limits : {fileSize : 5 * 1024 * 1024},
});

router.use('/image', express.static('./dbproj/server/image'));


router.post("/newitem", upload.single("image") , function (req, res, next) {
    const data = req.query.data;
    console.log(data);
    console.log("newitem");
    //TODO 파일 URL 확인 필요
    const file = req.file;
    console.log(file);
    const filePath = file.path;
    console.log(filePath);

    res.send({
        fileName : file,
        filePath : filePath,
    });
});
router.post("/setProduct", function (req, res, next) {

    const pName = req.query.pName;
    const pPrice = parseInt(req.query.pPrice);
    const pDescription = req.query.pDescription;
    const pCategory = req.query.pCategory;
    const pStock =  parseInt(req.query.pStock);
    const pImage = req.query.pImage;
    let category;
    if(pCategory.title){
        category = pCategory.title;
    }


    if(category){
        console.log("is working");
        connection.query("INSERT INTO product (pNAME, pPRICE, pDETAIL, pCATEGORY, 시계pSTOCK, pIMAGE1) VALUES (?, ?, ?, ?, ?, ?)", [pName, pPrice, pDescription, category, pStock, pImage], function (err, result, fields){
            if(err) throw err;
            console.log(result);
            res.send({ result: result });


        });
    } else console.log("is not working");
});


router.post("/searchItem", function (req, res, next) {
    const search = req.query.search;
    console.log(search);
    connection.query("SELECT * FROM product WHERE pNAME LIKE ?", ["%"+search+"%"], (err, rows, fields) =>{
        if(err) throw err;
        if(rows.length>0){
            console.log("success");
            res.send({result: true, rows: rows});
        }
    });
});


module.exports = router;
