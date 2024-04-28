const connection = require("./connection");

async function getAllUsers() {
   try {
      const sql = `SELECT * FROM users`;
      const result = await connection.promise().query(sql);
      return result[0];

   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong!");
   }
};

module.exports = {
   getAllUsers
};