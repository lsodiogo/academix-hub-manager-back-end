const router = require("express").Router();

const loginController = require("../controllers/login_controller");
const usersDB         = require("../db/users_db");
const tableName       = "users";

router.post("/", loginController.loginUser(usersDB, tableName));
router.get("/",  loginController.loginCheck);
router.get("/logout", loginController.logoutUser);

module.exports = router;