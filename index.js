require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors())

app.get("/test", async function(req, res) {
   res.json("Connection test");
});

app.listen(port, function() {
   console.log(`Listening on ${port}`);
});