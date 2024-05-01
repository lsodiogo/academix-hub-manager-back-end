const connection = require("./connection_db");



async function getAllItems() {
   try {
      const sql = `SELECT * FROM students`;
      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while searching all students!");
   };
};



async function getItemById(id) {
   const params = [id];

   try {
      const sql = `SELECT * FROM students WHERE id = ?`;
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while searching student ${id}!`);
   };
};



async function addItem(itemData) {
   const { email, password, category } = itemData;
   const params = [email, password, category];
   
   try {
      const sql = `INSERT INTO students (email, hashed_password, user_category_id) VALUES(?, ?, ?)`;
      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to insert student ${email}!`);
   };
};



async function updateItem(id, itemData) {
   const { email, password, category } = itemData;
   const params = [email, password, category, id];
   
   try {
      const sql = `UPDATE students SET email = ?, hashed_password = ?, user_category_id = ? WHERE id = ?`;
      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to update student ${email}!`);
   };
};



async function deleteItem(id) {
   const params = [id];

   try {
      const sql = `DELETE FROM students WHERE id = ?`;
      const result = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to delete student ${email}!`);
   };
};



module.exports = {
   getAllItems,
   getItemById,
   addItem,
   updateItem,
   deleteItem
};