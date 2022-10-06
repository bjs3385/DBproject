const express = require('express');
const app = express();
const mysql = require('mysql');
const PORT = process.env.PORT || 4000;

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'bjs3091',
    database: 'testdb',
    port: '3306',
});

app.get('/', (req, res) => {
    const sqlQuery = 'INSERT INTO requested (rowno) VALUES (1)';
    db.query(sqlQuery, (err, result) => {
        console.log(err);
        res.send('success');
    });
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} // http://localhost:${PORT}`);
});
