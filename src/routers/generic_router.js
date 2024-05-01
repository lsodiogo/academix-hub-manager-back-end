function genericRouter(controller, db) {
   const express = require("express");
   const router = express.Router();

   router.get('/', controller.getAllItems(db));
   router.get("/:id", controller.getItemById(db));
   router.post("/", controller.addItem(db));
   router.put("/:id", controller.updateItem(db));
   router.delete("/:id", controller.deleteItem(db));

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