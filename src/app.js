require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

const usersRouter           = require("./routers/users_router");
const schoolRouter          = require("./routers/school_router");
const coursesRouter         = require("./routers/courses_router");
const teachersRouter        = require("./routers/teachers_router");
const studentsRouter        = require("./routers/students_router");
const lessonsScheduleRouter = require("./routers/lessons_schedule_router");
const statusRouter          = require("./routers/status_router");
const usersCategoriesRouter = require("./routers/users_categories_router");

app.use(cors());
app.use(express.json());

app.use("/users",            usersRouter);
app.use("/school",           schoolRouter);
app.use("/courses",          coursesRouter);
app.use("/teachers",         teachersRouter);
app.use("/students",         studentsRouter);
app.use("/lessons_schedule", lessonsScheduleRouter);
app.use("/status",           statusRouter);
app.use("/users_categories", usersCategoriesRouter);

app.listen(port, function() {
   console.log(`Listening on ${port}`);
});