const mysql = require("mysql");

const db = mysql.createPool({
    host: "kwonbiver.iptime.org",
    user: "shopadmin",
    password: "password",
    port: 3306,
    database: "shop",
});

module.exports = db;