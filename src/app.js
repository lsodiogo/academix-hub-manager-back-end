require("dotenv").config();

const express = require("express");
const cors = require("cors");
const indexRouter = require("./routers/index");
const usersRouter = require("./routers/users");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use("/", indexRouter);
app.use("/", usersRouter);

app.listen(port, function() {
   console.log(`Listening on ${port}`);
});