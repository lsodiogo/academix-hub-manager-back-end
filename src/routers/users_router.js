const genericRouter     = require("./generic_router");
const genericController = require("../controllers/generic_controller");
const usersDB           = require("../db/users_db");
const tableName         = "users";
const usersRouter       = genericRouter(genericController, usersDB, tableName);

module.exports = usersRouter;