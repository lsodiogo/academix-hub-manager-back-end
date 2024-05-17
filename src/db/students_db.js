const connection = require("./connection_db");


async function getTotalItems() {
   
   const sql = `
      SELECT COUNT(*)
      AS total_items
      FROM students
   `;
   
   try {
      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while getting total of students!");
   };
};


async function getAllItems(limit, offset) {
   
   const params = [ limit, offset ];
   
   const sql = `
      SELECT students.*,
         courses.name AS course_name,
         status.name AS status_name
      FROM students
      JOIN courses ON students.course_id = courses.id
      JOIN status ON students.status_id = status.id
      ORDER BY students.name ASC
      LIMIT ?
      OFFSET ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while searching all students!");
   };
};


async function getItemById(id) {
   
   const params = [ id ];

   const sql = `
      SELECT students.*,
         courses.name AS course_name,
         status.name AS status_name
      FROM students
      JOIN courses ON students.course_id = courses.id
      JOIN status ON students.status_id = status.id
      WHERE students.id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while searching student ${id}!`);
   };
};


async function addItem(itemData) {
   
   const { name, surname, birthdate, email, telef, address, enrolled, course, grade, graduated, status } = itemData;
   const params = [ name, surname, birthdate, email, telef, address, enrolled, course, grade, graduated, status ];
   
   const sql = `
      INSERT INTO students
      (name, surname, birthdate, email, telef, address, enrolled, course, grade, graduated, status)
      VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to insert student ${email}!`);
   };
};


async function updateItem(id, itemData) {
   
   const { name, surname, birthdate, email, telef, address, enrolled, course, grade, graduated, status } = itemData;
   const params = [ name, surname, birthdate, email, telef, address, enrolled, course, grade, graduated, status, id ];
   
   const sql = `
      UPDATE students
      SET name = ?,
         surname = ?,
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

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to update student ${id}!`);
   };
};


async function deleteItem(id) {
   
   const params = [ id ];

   const sql = `
      DELETE FROM students
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to delete student ${id}!`);
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