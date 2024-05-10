const validator = require("validator");


function sanitiseBlankSpaces(itemData) {
   
   for (let key in itemData) {

      // Erase any extra blank spaces in the string values
      if (typeof itemData[key] === "string") {
         itemData[key] = itemData[key].trim().replace(/\s\s+/g, " ");

         // Validation if an item type string is empty
         if (validator.isEmpty(itemData[key])) {
            itemData[key] = null;
         };
      };
   };

   return itemData;
};


module.exports = {
   sanitiseBlankSpaces
};