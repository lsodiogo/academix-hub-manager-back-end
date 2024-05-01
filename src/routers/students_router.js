const genericRouter     = require("./generic_router");
const genericController = require("../controllers/generic_controller");
const studentsDB        = require("../db/students_db");
const studentsRouter    = genericRouter(genericController, studentsDB);

module.exports = studentsRouter;