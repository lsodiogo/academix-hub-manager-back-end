function genericRouter(controller, db, tableName) {
   const express = require("express");
   const router = express.Router();

   router.get('/', controller.getAllItems(db, tableName));
   router.get("/:id", controller.getItemById(db, tableName));
   router.post("/", controller.addItem(db, tableName));
   router.put("/:id", controller.updateItem(db, tableName));
   router.delete("/:id", controller.deleteItem(db, tableName));

   return router;
};

module.exports = genericRouter;



/* module.exports = function createGenericRouter(controller, db) {
   const express = require("express");
   const router = express.Router();

   router.get('/', controller.getAllItems(db));
   router.get("/:id", controller.getItemById(db));
   router.post("/", controller.addItem(db));
   router.put("/:id", controller.updateItem(db));
   router.delete("/:id", controller.deleteItem(db));

  return router;
}; */