const connection = require("./connection_db");


async function getTotalItems() {
   
   const sql = `
      SELECT COUNT(*)
      AS total_items
      FROM teachers;
   `;
   
   try {
      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went w9rong while getting total of teachers!");
   };
};


async function getAllItems(limit, offset) {
   
   const params = [ limit, offset ];
   
   const sql = `
      SELECT *
      FROM teachers
      LIMIT ?
      OFFSET ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while searching all teachers!");
   };
};


async function getItemById(id) {
   
   const params = [ id ];

   const sql = `
      SELECT *
      FROM teachers
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while searching teacher ${id}!`);
   };
};


async function addItem(itemData) {
   
   const { name, surname, birthdate, email, telef, address, started, status } = itemData;
   const params = [ name, surname, birthdate, email, telef, address, started, status ];
   
   const sql = `
      INSERT INTO teachers
      (name, surname, birthdate, email, telef, address, started_at, status_id)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?)
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to insert teacher ${email}!`);
   };
};


async function updateItem(id, itemData) {
   
   const { name, surname, birthdate, email, telef, address, started, status } = itemData;
   const params = [ name, surname, birthdate, email, telef, address, started, status, id ];
   
   const sql = `
      UPDATE teachers
      SET name = ?,
         surname = ?,
         birthdate = ?,
         email = ?,
         telef = ?,
         address = ?,
         started_at = ?,
         status_id = ?
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to update teacher ${id}!`);
   };
};


async function deleteItem(id) {
   
   const params = [ id ];

   const sql = `
      DELETE FROM teachers
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to delete teacher ${id}!`);
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