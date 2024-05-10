const connection = require("./connection_db");


async function getTotalItems() {
   try {
      const sql = `
         SELECT COUNT(*)
         AS total_items
         FROM students
      `;

      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while getting total of students!");
   };
};


async function getAllItems(limit, offset) {
   const params = [ limit, offset ];
   
   try {
      const sql = `
         SELECT *
         FROM students
         LIMIT ?
         OFFSET ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while searching all students!");
   };
};


async function getItemById(id) {
   const params = [ id ];

   try {
      const sql = `
         SELECT *
         FROM students
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while searching student ${id}!`);
   };
};


async function addItem(itemData) {
   const { names, surnames, birthdate, email, telef, address, enrolled, course, grade, graduated, status } = itemData;
   const params = [ names, surnames, birthdate, email, telef, address, enrolled, course, grade, graduated, status ];
   
   try {
      const sql = `
         INSERT INTO students
         (names, surnames, birthdate, email, telef, address, enrolled, course, grade, graduated, status)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to insert student ${email}!`);
   };
};


async function updateItem(id, itemData) {
   const { names, surnames, birthdate, email, telef, address, enrolled, course, grade, graduated, status } = itemData;
   const params = [ names, surnames, birthdate, email, telef, address, enrolled, course, grade, graduated, status, id ];
   
   try {
      const sql = `
         UPDATE students
         SET names = ?,
            surnames = ?,
            birthdate = ?,
            email = ?,
            telef = ?,
            address = ?,
            enrolled_at = ?,
            course_id = ?,
            grade = ?,
            graduated_at = ?,
            status_id = ?
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to update student ${id}!`);
   };
};


async function deleteItem(id) {
   const params = [ id ];

   try {
      const sql = `
         DELETE FROM students
         WHERE id = ?
      `;
      
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to delete student ${id}!`);
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