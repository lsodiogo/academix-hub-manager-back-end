const connection = require("./connection");

async function getAllUsers() {

   const sql = `SELECT * FROM users`;

   try {
      const result = await connection.promise().query(sql);
      return result;
   } catch(error) {
      console.log(error);
      throw new Error("Something went wrong!");
   }
};

module.exports = {
   getAllUsers
};