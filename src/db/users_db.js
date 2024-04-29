const connection = require("./connection_db");



async function getAllUsers() {
   try {
      const sql = `SELECT * FROM users`;
      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong!");
   };
};



async function getUserById(id) {
   const params = [id];

   try {
      const sql = `SELECT * FROM users WHERE id = ?`;
      const [result, fields] = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong!");
   };
};



async function addUser(email, password, category) {
   const params = [email, password, category];
   
   try {
      const sql = `INSERT INTO users (email, hashed_password, user_category_id) VALUES(?, ?, ?)`;
      const [result] = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while trying to Insert a user!");
   };
};



async function updateUser(id, email, password, category) {
   const params = [email, password, category, id];
   
   try {
      const sql = `UPDATE users SET email = ?, hashed_password = ?, user_category_id = ? WHERE id = ?`;
      const [result] = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while trying to update the user!");
   };
};



async function deleteUser(id) {
   const params = [id];

   try {
      const sql = `DELETE FROM users WHERE id = ?`;
      const [result] = await connection.promise().query(sql, params);
      return result;

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while trying to delete the user!");
   };
};



module.exports = {
   getAllUsers,
   getUserById,
   addUser,
   updateUser,
   deleteUser
};