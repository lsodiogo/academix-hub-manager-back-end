const genericRouter         = require("./generic_router");
const genericController     = require("../controllers/generic_controller");
const usersCategoriesDB     = require("../db/users_categories_db");
const tableName             = "users_categories";
const usersCategoriesRouter = genericRouter(genericController, usersCategoriesDB, tableName);

module.exports = usersCategoriesRouter;