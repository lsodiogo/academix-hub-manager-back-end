const connection = require("./connection_db");


async function getTotalItems() {
   
   const sql = `
      SELECT COUNT(*)
      AS total_items
      FROM users
   `;
   
   try {
      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while getting total of users!");
   };
};


async function getAllItems(limit, offset) {
   
   const params = [ limit, offset ];

   const sql = `
      SELECT id, email, category, created_at, updated_at
      FROM users
      ORDER BY category ASC
      LIMIT ?
      OFFSET ?
   `;
   
   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while searching all users!");
   };
};


async function getItemByEmail(email) {
   
   const params = [ email ];

   const sql = `
      SELECT id, email, category, created_at, updated_at
      FROM users
      WHERE email = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to log in user ${email}!`);
   };
};


async function getItemById(id) {
   
   const params = [ id ];

   const sql = `
      SELECT id, email, category, created_at, updated_at
      FROM users
      WHERE id = ?
   `;

   try {
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
   
   const sql = `
      INSERT INTO users
      (email, hashed_password, category)
      VALUES(?, ?, ?)
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to insert user ${email}!`);
   };
};


async function updateItem(id, itemData) {
   
   const { hashedPassword } = itemData;
   const params = [ hashedPassword, id ];
   
   const sql = `
      UPDATE users
      SET hashed_password = ?
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to update user ${id}!`);
   };
};


async function deleteItem(id) {
   
   const params = [ id ];

   const sql = `
      DELETE FROM users
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to delete user ${id}!`);
   };
};


async function userLogin(email) {
   
   const params = [ email ];

   const sql = `
      SELECT *
      FROM users
      WHERE email = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to log in user ${email}!`);
   };
};


async function getTeacherByEmail(email) {
   
   const params = [ email ];

   const sql = `
      SELECT *
      FROM teachers
      WHERE email = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to log in user ${email}!`);
   };
};


async function getStudentByEmail(email) {
   
   const params = [ email ];

   const sql = `
      SELECT *
      FROM students
      WHERE email = ?
   `;

   try {
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
   getItemByEmail,
   getItemById,
   addItem,
   updateItem,
   deleteItem,
   userLogin,
   getTeacherByEmail,
   getStudentByEmail
};