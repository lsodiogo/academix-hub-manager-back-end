function loginCheck(req, res)  {

   if (req.cookies.LoggedIn) {
      const data = JSON.parse(req.cookies.LoggedIn);

      console.log(req.cookies.LoggedIn);

      console.log(data);

      res.status(200).send("SUCCESS: User logged in!");

   } else {
      res.status(401).send("WARNING: Please, login!");
   };
};



module.exports = {
   loginCheck
};