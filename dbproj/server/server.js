const express = require('express');
const app = express();
const port = 4000;
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // mysql id
    password: 'root', // mysql password
    database: 'dbtest' // mysql database name
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("test")
})

