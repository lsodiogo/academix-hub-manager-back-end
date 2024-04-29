const express = require("express");

const router = express.Router();
const testController = require("../controllers/test_controller");

router.get("/", testController.test);

module.exports = router;