require("dotenv").config();

const express = require("express");
const cors = require("cors");
const indexRoutes = require("./routes/index");
const usersRoutes = require("./routes/users");

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use("/", indexRoutes);
app.use("/", usersRoutes);

app.listen(port, function() {
   console.log(`Listening on ${port}`);
});