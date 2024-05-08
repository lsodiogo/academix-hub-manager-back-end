const encryptionService      = require("../services/process_encryption");
const cookieService          = require("../services/process_cookie");
const backlogDB              = require("../db/backlog_db");



function loginUser(db, tableNameParam) {
   
   return async function(req, res) {

      const { email, password } = req.body;

      try {
         const item = await db.userLogin(email);
         const user = item[0];

         if (user) {
            const hashedPassword = user.hashed_password;

            const result = await encryptionService.verifyHash(hashedPassword, password);

            if (result === true) {
               const cookieData = {
                  userEmail: user.email
               };

               cookieService.setCookie(res, cookieData);

               res.status(200).send("SUCCESS: User logged in!");

               // To log into backlog if any user has logged in
               const action = "login";
               const tableName = tableNameParam;
               await backlogDB.logChangesToBacklog(user, user.id, action, tableName);

            } else {
               res.status(401).send("WARNING: Wrong password!");
            };

         } else {
            res.status(404).send("WARNING: User not found!");
         };

      } catch(error) {
         res.status(500).send(error.message);
      };
   };
};



function loginCheck(req, res)  {

   if (req.cookies.LoggedIn) {
      const data = JSON.parse(req.cookies.LoggedIn);

      console.log(req.cookies.LoggedIn);

      console.log(data);

      res.status(200).send("SUCCESS: User already logged in!");

   } else {
      res.status(401).send("WARNING: Please, login!");
   };
};



module.exports = {
   loginUser,
   loginCheck
};