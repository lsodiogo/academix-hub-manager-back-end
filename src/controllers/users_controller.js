const usersDB = require("../db/users_db");



async function getAll_Users(req, res) {

   try {
      const users = await usersDB.getAllItems();

      if (users) {
         res.json(users);
      } else {
         res.status(404).send("WARNING: Data not found!");
      };

   } catch(error) {
      res.status(500).send(error.message);
   };
};



async function getById_Users(req, res) {
   const { id } = req.params;
   
   try {
      const user = await usersDB.getItemById(id);

      if (user) {
         res.json(user);
      } else {
         res.status(404).send("WARNING: User inserted not found!");
      };

   } catch(error) {
      res.status(500).send(error.message);
   };
};



async function add_Users(req, res) {
   const itemData = req.body;

   // TO DO: add validation for password and category

   try {
      const result = await usersDB.addItem(itemData);
      
      // To show user inserted
      const lastUserInserted = result[0].insertId;
      const user = await usersDB.getItemById(lastUserInserted);
      res.json(user);

   } catch(error) {
      res.status(500).send(error.message);
   };
};



async function update_Users(req, res) {
   const { id } = req.params;
   const itemData = req.body;

   try {
      const result = await usersDB.updateItem(id, itemData);
      res.json(result);

   } catch(error) {
      res.status(500).send(error.message);
   };
};



async function delete_Users(req, res) {
   const { id } = req.params;

   try {
      const result = await usersDB.deleteItem(id);
      res.json(result);

   } catch(error) {
      res.status(500).send(error.message);
   };
};



module.exports = {
   getAll_Users,
   getById_Users,
   add_Users,
   update_Users,
   delete_Users
};