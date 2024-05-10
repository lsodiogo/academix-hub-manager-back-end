const connection = require("./connection_db");


async function getTotalItems() {
   try {
      const sql = `
         SELECT COUNT(*)
         AS total_items
         FROM school
      `;

      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while getting total of schools!");
   };
};


async function getAllItems(limit, offset) {
   const params = [ limit, offset ];
   
   try {
      const sql = `
         SELECT *
         FROM school
         LIMIT ?
         OFFSET ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while searching school!");
   };
};


async function getItemById(id) {
   const params = [ id ];

   try {
      const sql = `
         SELECT * FROM school
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while searching school!`);
   };
};


async function addItem(itemData) {
   const { name, abbreviation } = itemData;
   const params = [ name, abbreviation ];
   
   try {
      const sql = `
         INSERT INTO school
         (name, abbreviation)
         VALUES(?, ?)
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to insert school: ${name}!`);
   };
};


async function updateItem(id, itemData) {
   const { name, abbreviation} = itemData;
   const params = [ name, abbreviation, id ];
   
   try {
      const sql = `
         UPDATE school
         SET name = ?,
            abbreviation = ?
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to update school: ${name}!`);
   };
};


async function deleteItem(id) {
   const params = [ id ];

   try {
      const sql = `
         DELETE FROM school
         WHERE id = ?
      `;
      
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to delete school: ${id}!`);
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