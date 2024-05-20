const connection = require("./connection_db");


async function getTotalItems() {
   
   const sql = `
      SELECT COUNT(*)
      AS total_items
      FROM lessons_schedule
   `;

   try {
      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while getting total of lessons schedule!");
   };
};


async function getAllItems(limit, offset) {
   
   const params = [ limit, offset ];
   
   const sql = `
      SELECT lessons_schedule.*,
         courses.name AS course_name,
         status.name AS status_name
      FROM lessons_schedule
      JOIN courses ON lessons_schedule.course_id = courses.id
      JOIN status ON lessons_schedule.status_id = status.id
      ORDER BY lessons_schedule.date DESC
      LIMIT ?
      OFFSET ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong while searching all lessons schedule!");
   };
};


async function getItemById(id) {
   
   const params = [ id ];

   const sql = `
      SELECT lessons_schedule.*,
         courses.name AS course_name,
         status.name AS status_name
      FROM lessons_schedule
      JOIN courses ON lessons_schedule.course_id = courses.id
      JOIN status ON lessons_schedule.status_id = status.id
      WHERE lessons_schedule.id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while searching lesson schedule ${id}!`);
   };
};


async function addItem(itemData) {
   
   const { date, begin, end, description, course, status } = itemData;
   const params = [ date, begin, end, description, course, status ];
   
   const sql = `
      INSERT INTO lessons_schedule
      (date, begin_time, end_time, description, course_id, status_id)
      VALUES(?, ?, ?, ?, ?, ?)
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to insert lesson schedule ${date}!`);
   };
};


async function updateItem(id, itemData) {
   
   const { name } = itemData;
   const params = [ name, id ];
   
   const sql = `
      UPDATE lessons_schedule
      SET date = ?,
         begin = ?,
         end = ?,
         description = ?,
         course_id = ?,
         status_id = ?
      WHERE id = ?
   `;

   try {
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to update lesson schedule ${id}!`);
   };
};


async function deleteItem(id) {
   
   const params = [ id ];

   const sql = `
      DELETE FROM lessons_schedule
      WHERE id = ?
   `;

   try {   
      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`Something went wrong while trying to delete lesson schedule ${id}!`);
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