const connection = require("./connection_db");



async function getTotalItems() {
   try {
      const sql = `
         SELECT COUNT(*)
         AS total_items
         FROM users_categories
      `;

      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while getting total of user categories!");
   };
};



async function getAllItems(limit, offset) {
   const params = [ limit, offset ];
   
   try {
      const sql = `
         SELECT *
         FROM users_categories
         LIMIT ?
         OFFSET ?
      `;

      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while searching all user categories!");
   };
};



async function getItemById(id) {
   const params = [ id ];

   try {
      const sql = `
         SELECT * FROM users_categories
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while searching user category ${id}!`);
   };
};



async function addItem(itemData) {
   const { name } = itemData;
   const params = [ name ];
   
   try {
      const sql = `
         INSERT INTO users_categories
         (name)
         VALUES(?)
      `;

      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to insert user category ${name}!`);
   };
};



async function updateItem(id, itemData) {
   const { name } = itemData;
   const params = [ name, id ];
   
   try {
      const sql = `
         UPDATE users_categories
         SET name = ?
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to update user category ${id}!`);
   };
};



async function deleteItem(id) {
   const params = [ id ];

   try {
      const sql = `
         DELETE FROM users_categories
         WHERE id = ?
      `;
      
      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to delete user category ${id}!`);
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