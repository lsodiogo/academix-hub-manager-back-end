function getAllItems(db) {
   
   return async function(req, res) {
      
      try {
         const results = await db.getAllItems();

         // To show all data results of database
         if (results) {
            res.json(results);
         } else {
            res.status(404).send("WARNING: No data found!");
         };

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



function getItemById(db) {
   
   return async function(req, res) {
      
      const { id } = req.params;

      try {
         const result = await db.getItemById(id);

         // To show item data of database
         const item = result[0];
         if (item) {
            res.json(item);
         } else {
            res.status(404).send("WARNING: Item not found!");
         };

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



function addItem(db) {
   
   return async function(req, res) {

      const itemData = req.body;

      try {
         const result = await db.addItem(itemData);

         // To show item data inserted in database
         const lastItemId = result[0].insertId;
         const item = await db.getItemById(lastItemId);
         res.json(item[0]);

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



function updateItem(db) {
   
   return async function(req, res) {

      const { id } = req.params;
      const itemData = req.body;

      try {
         const result = await db.updateItem(id, itemData);

         // To show item data updated in database
         const itemUpdated = result[0].affectedRows;
         
         if (itemUpdated === 1) {
            const user = await db.getItemById(id);
            res.json(user[0]);
         } else {
            res.status(404).send("WARNING: Item not found!");
         }; 

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



function deleteItem(db) {
   
   return async function(req, res) {

      const { id } = req.params;

      try {
         const result = await db.deleteItem(id);
         
         // To show item data deleted from database
         const itemDeleted = result[0].affectedRows;

         if (itemDeleted === 1) {
            const user = await db.getItemById(id);
            res.send("WARNING: Item deleted!");

         } else {
            res.status(404).send("WARNING: Item not found!");
         }; 

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



module.exports = {
   getAllItems,
   getItemById,
   addItem,
   updateItem,
   deleteItem
};