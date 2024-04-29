require("dotenv").config();

const express = require("express");
const cors = require("cors");
const testRouter = require("./routers/test");
const usersRouter = require("./routers/users");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use("/test", testRouter);
app.use("/users", usersRouter);

app.listen(port, function() {
   console.log(`Listening on ${port}`);
});