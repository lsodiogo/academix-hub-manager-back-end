const genericRouter     = require("./generic_router");
const genericController = require("../controllers/generic_controller");
const schoolDB          = require("../db/school_db");
const tableName         = "school";
const schoolRouter      = genericRouter(genericController, schoolDB, tableName);

module.exports = schoolRouter;