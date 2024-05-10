const paginationLinksService = require("../services/process_pagination_links");
const validateDataService = require("../services/process_validate_data");
const dataUpdatesService = require("../services/process_data_updates");
const encryptionService = require("../services/process_encryption");
const cookieService  = require("../services/process_cookie");

const backlogDB = require("../db/backlog_db");


function getAllItems(db, tableNameParam) {
   
   return async function(req, res) {      

      try {

         // To start building pagination
         let { limit, offset } = req.query;
         limit = limit && !isNaN(parseInt(limit)) ? parseInt(limit) : 5;
         offset = offset && !isNaN(parseInt(offset)) ? parseInt(offset) : 0;

         const getTotalItems = await db.getTotalItems();
         const totalItems = getTotalItems[0].total_items;

         const allItems = await db.getAllItems(limit, offset);

         // To show all data results of database
         if (allItems) {

            // To create pagination
            const paginationLinks = paginationLinksService.processPaginationLinks(limit, offset, totalItems, tableNameParam);

            // To show data
            res.json(
               {
                  totalItems: totalItems,
                  ...paginationLinks,
                  results: allItems
               }
            );

         } else {
            res.status(404).send("WARNING: No data found!");
         };

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};


function getItemById(db, tableNameParam) {
   
   return async function(req, res) {

      try {
         
         const { id } = req.params;

         const itemById = await db.getItemById(id);
         
         // To show item data of database
         const item = itemById[0];

         if (item) {
            res.json(item);

            // To log into backlog if any search have been done
            const action = "search";
            const tableName = tableNameParam;
            await backlogDB.logChangesToBacklog(item, item.id, action, tableName);

         } else {
            res.status(404).send("WARNING: Item not found!");
         };

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};


function addItem(db, tableNameParam) {
   
   return async function(req, res) {
      
      const userLoggedIn = cookieService.verifyCookie(req);

      if (!userLoggedIn) {
         res.status(401).send("WARNING: Please, login!");
         return;
      };

      if (userLoggedIn.userCategory === "admin") {
   
         try {

            const bodyData = req.body;
            let itemData;

            // To validate if any data is empty
            await validateDataService.sanitiseBlankSpaces(bodyData);

            // To validate if the data is about a user and if so to encrypt the password 
            if (tableNameParam === "users") {
               const { email, password, category } = bodyData;
               const hashedPassword = await encryptionService.createHash(password);
               itemData = { email, hashedPassword, category };

            } else {
               itemData = bodyData;
            };
         
            const newItem = await db.addItem(itemData);

            // To show item data inserted in database
            const lastItemInserted = newItem.insertId;
            const item = await db.getItemById(lastItemInserted);
            res.json(item[0]);

            // To log into backlog if any insert have been done
            const action = "insert";
            const tableName = tableNameParam;
            await backlogDB.logChangesToBacklog(item[0], item[0].id, action, tableName);

         } catch(error) {
            res.status(500).send(error.message);
         };

      } else {
         res.status(401).send("WARNING: User not authorized!");
      };
   };
};


function updateItem(db, tableNameParam) {
   
   return async function(req, res) {

      const userLoggedIn = cookieService.verifyCookie(req);

      if (!userLoggedIn) {
         res.status(401).send("WARNING: Please, login!");
         return;
      };

      if (userLoggedIn.userCategory === "admin") {
      
         try {
            const { id } = req.params;
            const itemData = req.body;

            const oldItemData = await db.getItemById(id);
            
            const itemUpdated = await db.updateItem(id, itemData);
   
            // To show item data updated in database
            const item = itemUpdated.affectedRows;
            
            if (item === 1) {
               const newItemData = await db.getItemById(id);
               res.json(newItemData[0]);
               
               // To log into backlog if any update have been done
               const oldData = oldItemData[0];
               const newData = newItemData[0];
               const itemDataUpdated = dataUpdatesService.processDataUpdates(oldData, newData);
               const action = "update";
               const tableName = tableNameParam;
               await backlogDB.logChangesToBacklog(itemDataUpdated, id, action, tableName);
   
            } else {
               res.status(404).send("WARNING: Item not found!");
            }; 
   
         } catch(error) {
            res.status(500).send(error.message);
         };

      } else {
         res.status(401).send("WARNING: User not authorized!");
      };
   };
};


function deleteItem(db, tableNameParam) {
   
   return async function(req, res) {

      const userLoggedIn = cookieService.verifyCookie(req);

      if (!userLoggedIn) {
         res.status(401).send("WARNING: Please, login!");
         return;
      };

      if (userLoggedIn.userCategory === "admin") {
   
         try {

            const { id } = req.params;

            const oldItemData = await db.getItemById(id);
            const itemDeleted = await db.deleteItem(id);
            
            // To show item data deleted from database
            const item = itemDeleted.affectedRows;

            if (item === 1) {
               await db.getItemById(id);
               res.status(200).send("SUCCESS: Item deleted!");

               // To log into backlog if any delete have been done
               const oldData = oldItemData[0];
               const action = "delete";
               const tableName = tableNameParam;
               await backlogDB.logChangesToBacklog(oldData, id, action, tableName);

            } else {
               res.status(404).send("WARNING: Item not found!");
            }; 

         } catch(error) {
            res.status(500).send(error.message);
         };

      } else {
         res.status(401).send("WARNING: User not authorized!");
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