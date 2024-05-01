const genericRouter = require("./generic_router");

const genericController = require("../controllers/generic_controller");
const usersDB = require("../db/users_db");

module.exports = genericRouter(genericController, usersDB);



// FIRST ONE CODED

/* const express = require("express");

const router = express.Router();
const usersController = require("../controllers/users_controller");

router.get("/", usersController.getAll_Users);
router.get("/:id", usersController.getById_Users);
router.post("/", usersController.add_Users);
router.put("/:id", usersController.update_Users);
router.delete("/:id", usersController.delete_Users);

module.exports = router; */