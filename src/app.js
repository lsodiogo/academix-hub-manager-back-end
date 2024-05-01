require("dotenv").config();

const express  = require("express");
const cors     = require("cors");

const app   = express();
const port  = process.env.PORT || 3000;

const usersRouter    = require("./routers/users_router");
const studentsRouter = require("./routers/students_router");

app.use(cors());
app.use(express.json());

app.use("/users",    usersRouter);
app.use("/students", studentsRouter);

app.listen(port, function() {
   console.log(`Listening on ${port}`);
});