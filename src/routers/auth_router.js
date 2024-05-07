const router = require("express").Router();

const genericController    = require("../controllers/generic_controller");
const loginCheckController = require("../controllers/login_check_controller");const usersDB              = require("../db/users_db");
const tableName            = "users";

router.post("/login", genericController.loginUser(usersDB, tableName));
router.get("/loginCheck", loginCheckController.loginCheck);

module.exports = router;