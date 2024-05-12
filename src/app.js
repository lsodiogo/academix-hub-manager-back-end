require("dotenv").config();


const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");


const app = express();
const port = process.env.PORT || 3000;
const secretKey = process.env.SECRET_KEY;
const corsOptions = {
   origin: "http://localhost:5173",
   credentials: true
};


const loginRouter = require("./routers/login_router");
const usersRouter = require("./routers/users_router");
const schoolRouter = require("./routers/school_router");
const coursesRouter = require("./routers/courses_router");
const teachersRouter = require("./routers/teachers_router");
const studentsRouter = require("./routers/students_router");
const lessonsScheduleRouter = require("./routers/lessons_schedule_router");
const statusRouter = require("./routers/status_router");
const backlogRouter = require("./routers/backlog_router");


app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser(secretKey));


app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/school", schoolRouter);
app.use("/courses", coursesRouter);
app.use("/teachers", teachersRouter);
app.use("/students", studentsRouter);
app.use("/lessons_schedule", lessonsScheduleRouter);
app.use("/status", statusRouter);
app.use("/backlog", backlogRouter);


app.listen(port, function() {
   console.log(`Listening on ${port}`);
});