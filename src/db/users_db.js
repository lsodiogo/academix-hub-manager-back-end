const connection = require("./connection_db");


async function getTotalItems() {
   try {
      const sql = `
         SELECT COUNT(*)
         AS total_items
         FROM users
      `;

      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while getting total of users!");
   };
};


async function getAllItems(limit, offset) {
   const params = [ limit, offset ];
   
   try {
      const sql = `
         SELECT id, email, category, created_At, updated_at
         FROM users
         LIMIT ?
         OFFSET ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while searching all users!");
   };
};


async function getItemById(id) {
   const params = [ id ];

   try {
      const sql = `
         SELECT id, email, category, created_At, updated_at
         FROM users
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while searching user ${id}!`);
   };
};


async function addItem(itemData) {
   const { email, hashedPassword, category } = itemData;
   const params = [ email, hashedPassword, category ];
   
   try {
      const sql = `
         INSERT INTO users
         (email, hashed_password, category)
         VALUES(?, ?, ?)
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to insert user ${email}!`);
   };
};


async function updateItem(id, itemData) {
   const { email, hashedPassword, category } = itemData;
   const params = [ email, hashedPassword, category, id ];
   
   try {
      const sql = `
         UPDATE users
         SET email = ?,
            hashed_password = ?,
            category = ?
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to update user ${id}!`);
   };
};


async function deleteItem(id) {
   const params = [ id ];

   try {
      const sql = `
         DELETE FROM users
         WHERE id = ?
      `;
      
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to delete user ${id}!`);
   };
};


async function userLogin(email) {
   const params = [ email ];

   try {
      const sql = `
         SELECT *
         FROM users
         WHERE email = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to log in user ${email}!`);
   };
};


async function getTeacherByEmail(email) {
   const params = [ email ];

   try {
      const sql = `
         SELECT *
         FROM teachers
         WHERE email = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to log in user ${email}!`);
   };
};


async function getStudentByEmail(email) {
   const params = [ email ];

   try {
      const sql = `
         SELECT *
         FROM students
         WHERE email = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to log in user ${email}!`);
   };
};


module.exports = {
   getTotalItems,
   getAllItems,
   getItemById,
   addItem,
   updateItem,
   deleteItem,
   userLogin,
   getTeacherByEmail,
   getStudentByEmail
};