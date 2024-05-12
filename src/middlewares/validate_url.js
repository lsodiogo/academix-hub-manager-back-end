function isNumericId(req, res, next) {
   const { id } = req.params;
   
   if (isNaN(parseInt(id))) {
      res.status(400).json({
         error: "WARNING",
         message: "Invalid URL!"
      });
      
      return;    
   };

   next();
};


module.exports = isNumericId;