const usersDB = require("../db/users");



async function getAllUsers(req, res) {

   try {
      const users = await usersDB.getAllUsers();

      if (users) {
         res.json(users);
      } else {
         res.status(404).send("data not found");
      };

   } catch(error) {
      res.status(500).send(error.message);
   };
};



async function getUserById(req, res) {
   const { id } = req.params;
   
   try {
      const user = await usersDB.getUserById(id);

      if (user) {
         res.json(user);
      } else {
         res.status(404).send("User not found");
      };
   } catch(error) {
      res.status(500).send(error.message);
   };
};



async function addUser(req, res) {
   const { email, password, category } = req.body;

   // TO DO: add validation for password and category

   try {
      const result = await usersDB.addUser(email, password, category);
      console.log(result.insertId);
      
      // To show user inserted
      const lastUserInserted = result.insertId
      const user = await usersDB.getUserById(lastUserInserted);
      res.json(user);

   } catch(error) {
      res.status(500).send(error.message);
   };
};



module.exports = {
   getAllUsers,
   getUserById,
   addUser
};