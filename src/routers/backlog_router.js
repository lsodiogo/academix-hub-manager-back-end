const router = require("express").Router();

const genericController = require("../controllers/generic_controller");
const backlogDB         = require("../db/backlog_db");
const tableName         = "backlog";

router.get("/", genericController.getAllItems(backlogDB, tableName));

module.exports = router;