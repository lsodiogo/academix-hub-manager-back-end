const connection = require("./connection_db");



async function getTotalItems() {
   try {
      const sql = `
         SELECT COUNT(*)
         AS total_items
         FROM teachers;
      `;

      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while getting total of teachers!");
   };
};



async function getAllItems(limit, offset) {
   const params = [ limit, offset ];
   
   try {
      const sql = `
         SELECT *
         FROM teachers
         LIMIT ?
         OFFSET ?
      `;

      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while searching all teachers!");
   };
};



async function getItemById(id) {
   const params = [ id ];

   try {
      const sql = `
         SELECT * FROM teachers
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while searching teacher ${id}!`);
   };
};



async function addItem(itemData) {
   const { names, surnames, birthdate, email, telef, address, started, status } = itemData;
   const params = [ names, surnames, birthdate, email, telef, address, started, status ];
   
   try {
      const sql = `
         INSERT INTO teachers
         (names, surnames, birthdate, email, telef, address, started_at, status_id)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to insert teacher ${email}!`);
   };
};



async function updateItem(id, itemData) {
   const { names, surnames, birthdate, email, telef, address, started, status } = itemData;
   const params = [ names, surnames, birthdate, email, telef, address, started, status, id ];
   
   try {
      const sql = `
         UPDATE teachers
         SET names = ?,
            surnames = ?,
            birthdate = ?,
            email = ?,
            telef = ?,
            address = ?,
            started_at = ?,
            status_id = ?
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to update teacher ${id}!`);
   };
};



async function deleteItem(id) {
   const params = [ id ];

   try {
      const sql = `
         DELETE FROM teachers
         WHERE id = ?
      `;
      
      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to delete teacher ${id}!`);
   };
};



module.exports = {
   getTotalItems,
   getAllItems,
   getItemById,
   addItem,
   updateItem,
   deleteItem
};