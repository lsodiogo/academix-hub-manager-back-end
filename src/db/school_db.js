const connection = require("./connection_db");


async function getTotalItems() {
   
   const sql = `
      SELECT COUNT(*)
      AS total_items
      FROM school
   `;
   
   try {
      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while getting total of schools!");
   };
};


async function getAllItems(limit, offset) {
   
   const params = [ limit, offset ];
   
   const sql = `
      SELECT *
      FROM school
      LIMIT ?
      OFFSET ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0][0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while searching school!");
   };
};


async function getItemById(id) {
   
   const params = [ id ];

   const sql = `
      SELECT *
      FROM school
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while searching school ${id}!`);
   };
};


async function addItem(itemData) {
   
   const { name, abbreviation } = itemData;
   const params = [ name, abbreviation ];
   
   const sql = `
      INSERT INTO school
      (name, abbreviation)
      VALUES(?, ?)
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to insert school ${name}!`);
   };
};


async function updateItem(id, itemData) {
   
   const { name, abbreviation} = itemData;
   const params = [ name, abbreviation, id ];
   
   const sql = `
      UPDATE school
      SET name = ?,
         abbreviation = ?
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to update school ${name}!`);
   };
};


async function deleteItem(id) {
   
   const params = [ id ];

   const sql = `
      DELETE FROM school
      WHERE id = ?
   `;

   try {   
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to delete school ${id}!`);
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