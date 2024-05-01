const express = require("express");
const router = express.Router();



/* module.exports = function(controller, db) {
   router
      .get("/", 
         function(req, res) {
            controller.getAllItems(req, res, db)
         }
      )
   ;
   router.get("/:id", function(req, res) {controller.getItemById(req, res, db)});
   router.post("/", (req, res) => controller.addItem(req, res, db));
   router.put("/:id", (req, res) => controller.updateItem(req, res, db));
   router.delete("/:id", (req, res) => controller.deleteItem(req, res, db));

  return router;
}; */



function routers(controller, db) {
   router
   .get("/", 
         function(req, res) {
            controller.getAllItems(req, res, db)
         }
      )
   ;
   router.get("/:id", function(req, res) {controller.getItemById(req, res, db)});
   router.post("/", (req, res) => controller.addItem(req, res, db));
   router.put("/:id", (req, res) => controller.updateItem(req, res, db));
   router.delete("/:id", (req, res) => controller.deleteItem(req, res, db));

   return router;
};

module.exports = routers;



/* module.exports = function(controller) {
   router.get("/", controller.getAllItems);
   router.get("/:id", controller.getItemById);
   router.post("/", controller.addItem);
   router.put("/:id", controller.updateItem);
   router.delete("/:id", controller.deleteItem);
   
   return router;
}; */