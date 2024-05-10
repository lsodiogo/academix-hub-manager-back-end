const genericRouter     = require("./generic_router");
const genericController = require("../controllers/generic_controller");
const studentsDB        = require("../db/students_db");
const tableName         = "students";
const studentsRouter    = genericRouter(genericController, studentsDB, tableName);


module.exports = studentsRouter;