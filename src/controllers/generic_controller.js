const paginationLinksService = require("../services/process_pagination_links");
const validateDataService    = require("../services/process_validate_data");
const dataChangesService     = require("../services/process_data_changes");
const encryptionService      = require("../services/process_encryption");
const cookieService          = require("../services/process_cookie");

const backlogDB                  = require("../db/backlog_db");



function getAllItems(db, tableNameParam) {
   
   return async function(req, res) {
      
      let { limit, offset } = req.query;
      limit = limit && !isNaN(parseInt(limit)) ? parseInt(limit) : 5;
      offset = offset && !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
      

      try {
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
      
      const { id } = req.params;

      try {
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

      const bodyData = req.body;
      let itemData;

      // To validate if the data is about a user and if so to encrypt the password 
      if (tableNameParam === "users") {
         const { email, password, category } = bodyData;
         const hashedPassword = await encryptionService.createHash(password);
         itemData = { email, hashedPassword, category };

      } else {
         itemData = bodyData;
      };
     
      // To validate if any data null
      await validateDataService.sanitiseBlankSpaces(itemData);
      

      try {
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
   };
};



function updateItem(db, tableNameParam) {
   
   return async function(req, res) {

      const { id } = req.params;
      const itemData = req.body;

      try {
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
            const itemDataChanged = dataChangesService.processDataChanges(oldData, newData);
            const action = "update";
            const tableName = tableNameParam;
            await backlogDB.logChangesToBacklog(itemDataChanged, id, action, tableName);

         } else {
            res.status(404).send("WARNING: Item not found!");
         }; 

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



function deleteItem(db, tableNameParam) {
   
   return async function(req, res) {

      const { id } = req.params;

      try {
         const oldItemData = await db.getItemById(id);
         const itemDeleted = await db.deleteItem(id);
         
         // To show item data deleted from database
         const item = itemDeleted.affectedRows;

         if (item === 1) {
            await db.getItemById(id);
            res.send("WARNING: Item deleted!");

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
   };
};



function loginUser(db, tableNameParam) {
   
   return async function(req, res) {

      const { email, password } = req.body;

      try {
         const item = await db.userLogin(email);
         const user = item[0];

         if (user) {
            const hashedPassword = user.hashed_password;

            const result = await encryptionService.verifyHash(hashedPassword, password);

            if (result === true) {
               const cookieData = {
                  userEmail: user.email
               };

               cookieService.setCookie(res, cookieData);

               res.status(200).send("SUCCESS: User logged in!");

               // To log into backlog if any user has logged in
               const action = "login";
               const tableName = tableNameParam;
               await backlogDB.logChangesToBacklog(user, user.id, action, tableName);

            } else {
               res.status(401).send("WARNING: Wrong password!");
            };

         } else {
            res.status(404).send("WARNING: User not found!");
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
   deleteItem,
   loginUser
};