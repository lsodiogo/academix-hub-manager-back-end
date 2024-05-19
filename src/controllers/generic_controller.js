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
         res.status(401).json({
            error: "WARNING",
            message: "Please, login!"
         });

         return;
      };

      
      // To check if user logged in is:
         // Admins: full access
         // Teachers: full access, except users table and backlog table
         // Students: full access, except users table and backlog table
      if (
            (userLoggedIn.userCategory === "admin" ||
               ((userLoggedIn.userCategory === "teacher" || userLoggedIn.userCategory === "student") && (tableNameParam !== "users" && tableNameParam !== "backlog"))
            )
         ) {

         // To start building pagination
         let { limit, offset } = req.query;
         limit = limit && !isNaN(parseInt(limit)) ? parseInt(limit) : 5;
         offset = offset && !isNaN(parseInt(offset)) ? parseInt(offset) : 0;

         try {

            // To get total amount of items
            const getTotalItems = await db.getTotalItems();
            const totalItems = getTotalItems[0].total_items;


            // To get results of all items
            const allItems = await db.getAllItems(limit, offset);


            // // To check if items exists
            if (allItems) {

               // To process pagination
               const paginationLinksAccess = paginationLinksService.processPaginationLinks(limit, offset, totalItems, tableNameParam);

               // To show all data
               res.status(200).json(
                  {
                     totalItems: totalItems,
                     paginationLinksAccess,
                     results: allItems
                  }
               );

            } else {
               res.status(404).json({
                  error: "WARNING",
                  message: "No data found!"
               });
            };

         } catch(error) {
            res.status(500).json({
               error: "WARNING",
               message: error.message
            });
         };
      } else {
         res.status(401).json({
            error: "WARNING",
            message: "User not authorized!"
         });
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
         res.status(401).json({
            error: "WARNING",
            message: "Please, login!"
         });

         return;
      };

      
      try {

         // To get result of item by id
         const itemById = await db.getItemById(id);
         const item = itemById[0];


         // To check if item exists
         if (!item) {
            res.status(404).json({
               error: "WARNING",
               message: "Item not found!"
            });

            return;
         };


         // To check if user logged in is:
            // Admins: full access
            // Teachers: limited access, no access to users table, except user self-search
            // Students: limited access, no access to users table, except user self-search, and no access to teachers table and when students table only with self-search
         if ((userLoggedIn.userCategory === "admin") ||
               ((tableNameParam === "users" && id == userLoggedIn.userId) ||
                  (userLoggedIn.userCategory === "teacher" && tableNameParam !== "users") ||
                  (userLoggedIn.userCategory === "student" &&
                     ((tableNameParam === "students" && userLoggedIn.userEmail === itemById[0].email) ||
                     (tableNameParam !== "students" && tableNameParam !== "users" && tableNameParam !== "teachers"))
                  )
               )
            ) {
               

            //HERE   
            // To show data
            res.status(200).json(item);

            
            // To log into backlog if any search by id have been done
            const action = "search";
            const tableName = tableNameParam;
            const userLoggedInEmail = userLoggedIn.userEmail;
            await backlogDB.logChangesToBacklog(item, item.id, action, tableName, userLoggedInEmail);
            //HERE

               

         } else {
            res.status(401).json({
               error: "WARNING",
               message: "User not authorized!"
            });
         };

      } catch(error) {
         res.status(500).json({
            error: "WARNING",
            message: error.message
         });
      };
   };
};



function addItem(db, tableNameParam) {
   
   return async function(req, res) {

      // To get cookies
      const userLoggedIn = cookieService.verifyCookie(req);


      // To check if user is logged in and if it's admin
      if (!userLoggedIn) {
         res.status(401).json({
            error: "WARNING",
            message: "Please, login!"
         });

         return;
      };


      // To check if user logged in is:
         // Admins: only admins have permission to delete data
      if (userLoggedIn.userCategory !== "admin") {
         res.status(401).json({
            error: "WARNING",
            message: "User not authorized!"
         });

         return;
      };

      
      // To check when inserting new users with category teachers or students, if email is already entered at table of teachers or students
      let userTeacherTrue = false;
      let userStudentTrue = false;
      let userAdminTrue = false;

      if (tableNameParam === "users" && req.body.category === "teacher") {
         
         try {
            const teacherByEmail = await db.getTeacherByEmail(req.body.email);

            if (!teacherByEmail[0]) {
               res.status(404).json({
                  error: "WARNING",
                  message: "User not found!"
               });

               return;

            } else {
               userTeacherTrue = true;
            };

         } catch(error) {
            res.status(500).json({
               error: "WARNING",
               message: error.message
            });
         };
      };

      if (tableNameParam === "users" && req.body.category === "student") {
         
         try {
            const studentByEmail = await db.getStudentByEmail(req.body.email);

            if (!studentByEmail[0]) {
               res.status(404).json({
                  error: "WARNING",
                  message: "User not found!"
               });

               return;

            } else {
               userStudentTrue = true;
            };

         } catch(error) {
            res.status(500).json({
               error: "WARNING",
               message: error.message
            });
         };
      };

      if (tableNameParam === "users" && req.body.category === "admin") {
         userAdminTrue = true;
      };


      // To check if user logged in is:
         // Admins: only admins have permission to insert data and when a new user with category of teacher or student, email must be already entered at table of teachers or students
      if (tableNameParam !== "users" || (tableNameParam === "users" && (userAdminTrue || userTeacherTrue || userStudentTrue))) {
         
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

         try {         

            // To insert item in database
            const newItem = await db.addItem(itemData);


            // To show item data inserted in database
            const lastItemInserted = newItem.insertId;
            const item = await db.getItemById(lastItemInserted);
            res.status(200).json(item[0]);


            // To log into backlog if any insert have been done
            const action = "insert";
            const tableName = tableNameParam;
            const userLoggedInEmail = userLoggedIn.userEmail
            
            await backlogDB.logChangesToBacklog(item[0], item[0].id, action, tableName, userLoggedInEmail);

         } catch(error) {
            res.status(500).json({
               error: "WARNING",
               message: error.message
            });
         };

      } else {
         res.status(404).json({
            error: "WARNING",
            message: "User not found!"
         });
      };
   };
};



function updateItem(db, tableNameParam) {
   
   return async function(req, res) {

      // To get cookies
      const userLoggedIn = cookieService.verifyCookie(req);


      // To check if user is logged in
      if (!userLoggedIn) {
         res.status(401).json({
            error: "WARNING",
            message: "Please, login!"
         });

         return;
      };


      const { id } = req.params;
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


      // To check if user logged in is:
         // Admins: only admins have permission to update data, except for users table updates, which must be done only by the user themselves and only possible to update password
      if ((userLoggedIn.userCategory === "admin" && tableNameParam !== "users") || (tableNameParam === "users" && id == userLoggedIn.userId)) {
      
         try {

            // To get old data
            const oldItemData = await db.getItemById(id);


            //To get new data updated
            const itemUpdated = await db.updateItem(id, itemData);
 

            // To show item data updated in database
            const item = itemUpdated.affectedRows;
            

            // To check if item exists
            if (item === 1) {
               const newItemData = await db.getItemById(id);
               res.status(200).json(newItemData[0]);
               

               // To log into backlog if any update have been done
               const oldData = oldItemData[0];
               const newData = newItemData[0];
               const itemDataUpdated = dataUpdatesService.processDataUpdates(oldData, newData);

               const action = "update";
               const tableName = tableNameParam;
               const userLoggedInEmail = userLoggedIn.userEmail;

               await backlogDB.logChangesToBacklog(itemDataUpdated, id, action, tableName, userLoggedInEmail);
   
            } else {
               res.status(404).json({
                  error: "WARNING",
                  message: "Item not found!"
               });
            }; 
   
         } catch(error) {
            res.status(500).json({
               error: "WARNING",
               message: error.message
            });
         };

      } else {
         res.status(401).json({
            error: "WARNING",
            message: "User not authorized!"
         });
      };
   };
};



function deleteItem(db, tableNameParam) {
   
   return async function(req, res) {

      // To get cookies
      const userLoggedIn = cookieService.verifyCookie(req);


      // To check if user is logged in
      if (!userLoggedIn) {
         res.status(401).json({
            error: "WARNING",
            message: "Please, login!"
         });

         return;
      };
      

      // To check if user logged in is:
         // Admins: only admins have permission to delete data
      if (userLoggedIn.userCategory !== "admin") {
         res.status(401).json({
            error: "WARNING",
            message: "User not authorized!"
         });

         return;
      };


      const { id } = req.params;


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
            res.status(200).json({
               error: "SUCCESS",
               message: "Item deleted!"
            });

            // To log into backlog if any delete have been done
            const oldData = oldItemData[0];
            const action = "delete";
            const tableName = tableNameParam;
            const userLoggedInEmail = userLoggedIn.userEmail;
            await backlogDB.logChangesToBacklog(oldData, id, action, tableName, userLoggedInEmail);

         } else {
            res.status(404).json({
               error: "WARNING",
               message: "Item not found!"
            });
         }; 

      } catch(error) {
         res.status(500).json({
            error: "WARNING",
            message: error.message
         });
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