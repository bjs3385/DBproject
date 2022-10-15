const express = require("express");
const cors = require("cors");
const app = express();
const port = 4000;

const test = require("./Router/test");

app.use(cors());
app.use("/api", test);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
