function processDataUpdates(oldData, newData) {
   
   const itemDataUpdated = {};
            
   for (const key in newData) {
      if (oldData[key] !== newData[key]) {
         
         // Ignores if the values are equal with date type
         if (
            newData[key] instanceof Date &&
            oldData[key] instanceof Date &&
            newData[key].getTime() === oldData[key].getTime()
         ) {
            continue; 
         };
               
         itemDataUpdated[key] = { oldData: oldData[key], newData: newData[key] };
      };
   };

   return itemDataUpdated;
};


module.exports = {
   processDataUpdates
};