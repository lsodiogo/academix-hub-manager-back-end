const connection = require("./connection_db");


async function getTotalItems() {
   try {
      const sql = `
         SELECT COUNT(*)
         AS total_items
         FROM lessons_schedule
      `;

      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while getting total of lessons schedule!");
   };
};


async function getAllItems(limit, offset) {
   const params = [ limit, offset ];
   
   try {
      const sql = `
         SELECT *
         FROM lessons_schedule
         LIMIT ?
         OFFSET ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("WARNING: Something went wrong while searching all lessons schedule!");
   };
};


async function getItemById(id) {
   const params = [ id ];

   try {
      const sql = `
         SELECT * FROM lessons_schedule
         WHERE id = ?
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while searching lesson schedule ${id}!`);
   };
};


async function addItem(itemData) {
   const { date, begin, end, description, course, status } = itemData;
   const params = [ date, begin, end, description, course, status ];
   
   try {
      const sql = `
         INSERT INTO lessons_schedule
         (date, begin_time, end_time, description, course_id, status_id)
         VALUES(?, ?, ?, ?, ?, ?)
      `;

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to insert lesson schedule ${name}!`);
   };
};


async function updateItem(id, itemData) {
   const { name } = itemData;
   const params = [ name, id ];
   
   try {
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

      const result = await connection.promise().query(sql, params);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error(`WARNING: Something went wrong while trying to update lesson schedule ${id}!`);
   };
};


async function deleteItem(id) {
   const params = [ id ];

   try {
      const sql = `
         DELETE FROM lessons_schedule
         WHERE id = ?
      `;
      
      const result = await connection.promise().query(sql, params);
      return result[0];

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