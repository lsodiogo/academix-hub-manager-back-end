const connection = require("./connection_db");


async function getTotalItems() {
   
   const sql = `
      SELECT COUNT(*)
      AS total_items
      FROM backlog
   `;
   
   try {
      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while getting total of logs!");
   };
};


async function getAllItems(limit, offset) {
   
   const params = [ limit, offset ];
   
   const sql = `
      SELECT *
      FROM backlog
      ORDER BY created_at DESC
      LIMIT ?
      OFFSET ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while searching all logs!");
   };
};


async function logChangesToBacklog(itemData, item_id, action, tableName, userLoggedInEmail) {
   
   // To check if actually any changes have been done
   if (Object.keys(itemData).length !== 0) {

      const itemDataString = JSON.stringify(itemData);
      const params = [ action, tableName, item_id, itemDataString, userLoggedInEmail ];

      const sql = `
         INSERT INTO backlog
         (action, table_name, row_id, action_description, user_email)
         VALUES(?, ?, ?, ?, ?)
      `;
      
      try {
         const result = await connection.promise().query(sql, params);
         return result[0];

      } catch(error) {
         console.log(error);
         throw new Error("Something went wrong while trying to log changes to backlog!");
      };
   };
};


module.exports = {
   getTotalItems,
   getAllItems,
   logChangesToBacklog
};