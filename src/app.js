require("dotenv").config();

const express = require("express");
const cors = require("cors");

const usersRouter = require("./routers/users_router");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/users", usersRouter);

app.listen(port, function() {
   console.log(`Listening on ${port}`);
});