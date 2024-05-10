const genericRouter     = require("./generic_router");
const genericController = require("../controllers/generic_controller");
const coursesDB         = require("../db/courses_db");
const tableName         = "courses";
const coursesRouter     = genericRouter(genericController, coursesDB, tableName);


module.exports = coursesRouter;