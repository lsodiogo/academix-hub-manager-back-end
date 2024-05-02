const connection = require("./connection_db");



async function getTotalItems() {
   try {
      const sql = `
         SELECT COUNT(*)
         AS total_items
         FROM status
      `;

      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while getting total of status!");
   };
};



async function getAllItems() {
   try {
      const sql = `
         SELECT *
         FROM status
      `;

      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while searching all status!");
   };
};



async function getItemById(id) {
   const params = [id];

   try {
      const sql = `
         SELECT * FROM status
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while searching status ${id}!`);
   };
};



async function addItem(itemData) {
   const { name, description } = itemData;
   const params = [name, description];
   
   try {
      const sql = `
         INSERT INTO status
         (name, description)
         VALUES(?, ?)
      `;

      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to insert status ${name}!`);
   };
};



async function updateItem(id, itemData) {
   const { name, description} = itemData;
   const params = [name, description, id];
   
   try {
      const sql = `
         UPDATE status
         SET name = ?,
            description = ?
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to update status ${id}!`);
   };
};



async function deleteItem(id) {
   const params = [id];

   try {
      const sql = `
         DELETE FROM status
         WHERE id = ?
      `;
      
      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to delete status ${id}!`);
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