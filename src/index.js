require("dotenv").config();

const express = require("express");
const cors = require("cors");

const appController = require("./controllers/appController");

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/test", appController.index);

app.listen(port, function() {
   console.log(`Listening on ${port}`);
});