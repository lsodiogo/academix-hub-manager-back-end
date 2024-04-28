const usersDB = require("../db/users");

async function getAllUsers(req, res) {

   try {
      const users = await usersDB.getAllUsers();
      if (users) {
         res.json(users);
      } else {
         res.status(404).send("data not found");
      }
   } catch(error) {
      res.status(500).send(error.message);
   }
};

module.exports = {
   getAllUsers
};