const genericRouter     = require("./generic_router");
const genericController = require("../controllers/generic_controller");
const teachersDB        = require("../db/teachers_db");
const tableName         = "teachers";
const teachersRouter    = genericRouter(genericController, teachersDB, tableName);

module.exports = teachersRouter;