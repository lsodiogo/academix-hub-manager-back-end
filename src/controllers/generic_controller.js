const { processPaginationLinks } = require("../services/process_pagination_links");

const { processDataChanges } = require("../services/process_data_changes");
const { logChangesToBacklog } = require("../db/backlog_db");

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
            const paginationLinks = processPaginationLinks(limit, offset, totalItems, tableNameParam);

            // To show data
            res.json(
               {
                  totalItems: totalItems,
                  ...paginationLinks,
                  results: allItems
               }
            );

            /* // To log into backlog if any search have been done
            const action = "search";
            const tableName = tableNameParam;
            const searchAll = {
               id: "NO ID AVAILABLE",
               action: `AS SEARCHING FOR ${totalItems} ITEMS`
            };
            await logChangesToBacklog(searchAll, "0", action, tableName); */

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
            await logChangesToBacklog(item, item.id, action, tableName);

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

      const itemData = req.body;

      try {
         const newItem = await db.addItem(itemData);
         console.log(newItem.info);

         // To show item data inserted in database
         const lastItemInserted = newItem[0].insertId;
         const item = await db.getItemById(lastItemInserted);
         res.json(item[0]);

         // To log into backlog if any insert have been done
         const action = "insert";
         const tableName = tableNameParam;
         await logChangesToBacklog(item[0], item[0].id, action, tableName);

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
         const item = itemUpdated[0].affectedRows;
         
         if (item === 1) {
            const newItemData = await db.getItemById(id);
            res.json(newItemData[0]);
            
            // To log into backlog if any update have been done
            const oldData = oldItemData[0];
            const newData = newItemData[0];
            const itemDataChanged = processDataChanges(oldData, newData);
            const action = "update";
            const tableName = tableNameParam;
            await logChangesToBacklog(itemDataChanged, id, action, tableName);

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
         const item = itemDeleted[0].affectedRows;

         if (item === 1) {
            await db.getItemById(id);
            res.send("WARNING: Item deleted!");

            // To log into backlog if any delete have been done
            const oldData = oldItemData[0];
            const action = "delete";
            const tableName = tableNameParam;
            await logChangesToBacklog(oldData, id, action, tableName);

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