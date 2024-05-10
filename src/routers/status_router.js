const genericRouter     = require("./generic_router");
const genericController = require("../controllers/generic_controller");
const statusDB          = require("../db/status_db");
const tableName         = "status";
const statusRouter      = genericRouter(genericController, statusDB, tableName);


module.exports = statusRouter;