const connection = require("./connection_db");



async function logChangesToBacklog(itemData, id, action, tableName) {
   
   // To check if actually any changes have been done
   if (Object.keys(itemData).length !== 0) {

      const itemDataString = JSON.stringify(itemData);
      const params = [ action, tableName, id, itemDataString, "1" ];
      
      try {
         // TO DO: Validations for table_name and user_id
         const sql = `
            INSERT INTO backlog
            (action, table_name, row_id, action_description, user_id)
            VALUES(?, ?, ?, ?, ?)
         `;

         const result = await connection.promise().query(sql, params);
         return result;

      } catch(error) {
         console.log(error);
         throw new Error("WARNING: Something went wrong while trying to log changes to backlog!");
      };
   };
};



module.exports = {
   logChangesToBacklog
};