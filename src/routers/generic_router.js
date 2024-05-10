function genericRouter(controller, db, tableName) {
   const express = require("express");
   const router  = express.Router();
   const isNumericId = require("../middlewares/validate_url");

   router.get   ("/",    controller.getAllItems(db, tableName));
   router.get   ("/:id", isNumericId, controller.getItemById(db, tableName));
   router.post  ("/",    controller.addItem(db, tableName));
   router.put   ("/:id", isNumericId, controller.updateItem(db, tableName));
   router.delete("/:id", isNumericId, controller.deleteItem(db, tableName));

   return router;
};


module.exports = genericRouter;