const paginationLinksService = require("../services/process_pagination_links");
const validateDataService = require("../services/process_validate_data");
const dataUpdatesService = require("../services/process_data_updates");
const encryptionService = require("../services/process_encryption");
const cookieService  = require("../services/process_cookie");

const backlogDB = require("../db/backlog_db");



function getAllItems(db, tableNameParam) {
   
   return async function(req, res) {      

      // To get cookies
      const userLoggedIn = cookieService.verifyCookie(req);


      // To check if user is logged in
      if (!userLoggedIn) {
         res.status(401).send("WARNING: Please, login!");
         return;
      };

      
      // To check if user logged in is:
         // Admins (full access)
         // Teacher (full access, except users table and backlog table)
         // Student (full access, except users table and backlog table)
      if (
            (userLoggedIn.userCategory === "admin" ||
               ((userLoggedIn.userCategory === "teacher" || userLoggedIn.userCategory === "student") && (tableNameParam != "users" && tableNameParam != "backlog"))
            )
         ) {

         try {

            // To start building pagination
            let { limit, offset } = req.query;
            limit = limit && !isNaN(parseInt(limit)) ? parseInt(limit) : 5;
            offset = offset && !isNaN(parseInt(offset)) ? parseInt(offset) : 0;


            // To get total amount of items
            const getTotalItems = await db.getTotalItems();
            const totalItems = getTotalItems[0].total_items;


            // To get results of all items
            const allItems = await db.getAllItems(limit, offset);


            // // To check if items exists
            if (allItems) {

               // To process pagination
               const paginationLinks = paginationLinksService.processPaginationLinks(limit, offset, totalItems, tableNameParam);

               // To show all data
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
      } else {
         res.status(401).send("WARNING: User not authorized!");
      };
   };
};



function getItemById(db, tableNameParam) {
   
   return async function(req, res) {

      const { id } = req.params;
      
      // To get cookies
      const userLoggedIn = cookieService.verifyCookie(req);


      // To check if user is logged in
      if (!userLoggedIn) {
         res.status(401).send("WARNING: Please, login!");
         return;
      };


      // To get result of item by id
      const itemById = await db.getItemById(id);


      // To check if user logged in is:
         // Admins (full access)
         // Teacher (limited access, no access to users table)
         // Student (limited access, no access to users table and teachers table and when students table only with self-search)
      if (
         (userLoggedIn.userCategory === "admin" ||
            (userLoggedIn.userCategory === "teacher" && tableNameParam != "users")
         ) ||
         (userLoggedIn.userCategory === "student" &&
            ((tableNameParam != "users" && tableNameParam != "teachers") ||
               (tableNameParam === "students" && userLoggedIn.userEmail === itemById[0].email)
            )
         )
      ) {

         try {
            
            const item = itemById[0];

            // To check if item exists
            if (item) {
               
               // To show data
               res.json(item);

               
               // To log into backlog if any search by id have been done
               const action = "search";
               const tableName = tableNameParam;
               const userLoggedInEmail = userLoggedIn.userEmail;
               await backlogDB.logChangesToBacklog(item, item.id, action, tableName, userLoggedInEmail);

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



function addItem(db, tableNameParam) {
   
   return async function(req, res) {
      
      // To get cookies
      const userLoggedIn = cookieService.verifyCookie(req);


      // To check if user is logged in (no login required for new user insert)
      if (!userLoggedIn && tableNameParam != "users") {
         res.status(401).send("WARNING: Please, login!");
         return;
      };


      // To check if user logged in is:
         // Admins (full access) or new user creation (no login required)
      if (tableNameParam === "users" || userLoggedIn.userCategory === "admin") {
   
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
         

            // To insert item in database
            const newItem = await db.addItem(itemData);


            // To show item data inserted in database
            const lastItemInserted = newItem.insertId;
            const item = await db.getItemById(lastItemInserted);
            res.json(item[0]);


            // To log into backlog if any insert have been done
            const action = "insert";
            const tableName = tableNameParam;
            let userLoggedInEmail;

            if (tableNameParam === "users"){
               userLoggedInEmail = item[0].email;
            } else {
               userLoggedInEmail = userLoggedIn.userEmail;
            };
            
            await backlogDB.logChangesToBacklog(item[0], item[0].id, action, tableName, userLoggedInEmail);

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

      const { id } = req.params;

      // To get cookies
      const userLoggedIn = cookieService.verifyCookie(req);


      // To check if user is logged in
      if (!userLoggedIn) {
         res.status(401).send("WARNING: Please, login!");
         return;
      };


      // To check if user logged in is:
         // Admins: only admins have permission to update data, except for users updates, which must be done only by the user themselves 
      if ((userLoggedIn.userCategory === "admin" && tableNameParam != "users") || (tableNameParam === "users" && id == userLoggedIn.userId)) {
      
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


            // To get old data
            const oldItemData = await db.getItemById(id);
            

            //To get new data updated
            const itemUpdated = await db.updateItem(id, itemData);
   

            // To show item data updated in database
            const item = itemUpdated.affectedRows;
            

            // To check if item exists
            if (item === 1) {
               const newItemData = await db.getItemById(id);
               res.json(newItemData[0]);
               

               // To log into backlog if any update have been done
               const oldData = oldItemData[0];
               const newData = newItemData[0];
               const itemDataUpdated = dataUpdatesService.processDataUpdates(oldData, newData);
               const action = "update";
               const tableName = tableNameParam;
               const userLoggedInEmail = userLoggedIn.userEmail;
               await backlogDB.logChangesToBacklog(itemDataUpdated, id, action, tableName, userLoggedInEmail);
   
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

      const { id } = req.params;

      // To get cookies
      const userLoggedIn = cookieService.verifyCookie(req);


      // To check if user is logged in
      if (!userLoggedIn) {
         res.status(401).send("WARNING: Please, login!");
         return;
      };


      // To check if user logged in is:
         // Admins: only admins have permission to delete data, except for users deletes, which must be done only by the user themselves
      if ((userLoggedIn.userCategory === "admin" && tableNameParam != "users") || (tableNameParam === "users" && id == userLoggedIn.userId)) {
   
         try {

            // To get data
            const oldItemData = await db.getItemById(id);


            //To delete item
            const itemDeleted = await db.deleteItem(id);
            

            // To show item data deleted from database
            const item = itemDeleted.affectedRows;


            // To check if item exists
            if (item === 1) {
               await db.getItemById(id);
               res.status(200).send("SUCCESS: Item deleted!");

               // To log into backlog if any delete have been done
               const oldData = oldItemData[0];
               const action = "delete";
               const tableName = tableNameParam;
               const userLoggedInEmail = userLoggedIn.userEmail;
               await backlogDB.logChangesToBacklog(oldData, id, action, tableName, userLoggedInEmail);

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