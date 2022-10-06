const express = require("express");
const app = express();
const port = process.env.prot || 4000;

const test = require("./Router/test");

app.use("/", test);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
