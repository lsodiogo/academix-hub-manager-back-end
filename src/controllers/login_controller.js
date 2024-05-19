const encryptionService = require("../services/process_encryption");
const cookieService = require("../services/process_cookie");
const backlogDB = require("../db/backlog_db");


function loginUser(db, tableNameParam) {
   
   return async function(req, res) {

      try {

         const { email, password, rememberMe } = req.body;
         
         const item = await db.userLogin(email);
         const user = item[0];

         if (user) {
            const hashedPassword = user.hashed_password;

            const result = await encryptionService.verifyHash(hashedPassword, password);

            if (result === true) {
               const cookieData = {
                  userId: user.id,
                  userEmail: user.email,
                  userCategory: user.category
               };
               
               cookieService.setCookie(res, cookieData, rememberMe);

               res.status(200).json({
                  error: "SUCCESS",
                  message: `User ${user.email} logged in!`
               });

               // To log into backlog if any user has logged in
               const action = "login";
               const tableName = tableNameParam;
               await backlogDB.logChangesToBacklog(user, user.id, action, tableName, user.email);

            } else {
               res.status(401).json({
                  error: "WARNING",
                  message: "Wrong password!"
               });
            };

         } else {
            res.status(404).json({
               error: "WARNING",
               message: "User not found!"
            });
         };

      } catch(error) {
         res.status(500).json({
            error: "WARNING",
            message: error.message
         });
      };
   };
};


function loginCheck(req, res)  {

   // To check if user is logged in
   const result = cookieService.verifyCookie(req);

   if (result) {
      res.status(200).json(result);
   } else {
      res.status(401).json({
         error: "WARNING",
         message: "Please, login!"
      });
   };
};


function logoutUser(req, res)  {

   // To logout user
   const result = cookieService.clearCookie(req, res);

   if (result) {
      res.status(200).json({
         error: "SUCCESS",
         message: `Logout successful!`
      });
   } else {
      res.status(404).json({
         error: "WARNING",
         message: "No user logged in!"
      });
   };
};


module.exports = {
   loginUser,
   loginCheck,
   logoutUser
};