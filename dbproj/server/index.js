const express = require("express");
const app = express();
const port = process.env.prot || 4000;

app.get("/", (req, res) => {
    console.log("Hello World");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
