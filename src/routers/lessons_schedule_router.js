const genericRouter         = require("./generic_router");
const genericController     = require("../controllers/generic_controller");
const lessonsSchedulesDB    = require("../db/lessons_schedule_db");
const tableName             = "lessons_schedule";
const lessonsScheduleRouter = genericRouter(genericController, lessonsSchedulesDB, tableName);


module.exports = lessonsScheduleRouter;