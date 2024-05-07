const validator = require('validator');



function sanitiseBlankSpaces(itemData) {
   
   for (let key in itemData) {

      // Erase any extra blank spaces in the string values
      if (typeof itemData[key] === "string") {
         itemData[key] = itemData[key].trim().replace(/\s\s+/g, " ");
      };

      // Validation if an item type string is empty
      if (typeof itemData[key] === "string" && validator.isEmpty(itemData[key])) {
         console.log(`${key} is empty`);

         // ADD CODE

      } else {
         console.log(`${key} is not empty`);

         // ADD CODE

      };
   };

   return itemData;
};



module.exports = {
   sanitiseBlankSpaces
};