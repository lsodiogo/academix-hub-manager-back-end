function processPaginationLinks(limit, offset, totalItems, tableNameParam) {

   const firstOffset    = 0;
   const nextOffset     = offset + limit;
   const previousOffset = offset - limit;
   const lastOffset     = Math.floor((totalItems / limit)) * limit - 1;


   
   // To build the first page link
   const firstPage = `http://localhost:3000/${tableNameParam}/?limit=${limit}&offset=${firstOffset}`;



   // To build the next page
   let nextPage = null;

   if (nextOffset < totalItems) {
      nextPage = `http://localhost:3000/${tableNameParam}/?limit=${limit}&offset=${nextOffset}`;
   };



   // To build the previous link
   let prevPage = null;

   // To make sure when the offset is changed in the URL, while clicking "previous" can go back to the very first result
   if (offset > 0 && offset < limit) {
      prevPage = firstPage;
   };

   if (previousOffset >= 0) {
      prevPage = `http://localhost:3000/${tableNameParam}/?limit=${limit}&offset=${previousOffset}`;
   };



   // To build the last page link
   const lastPage = `http://localhost:3000/${tableNameParam}/?limit=${limit}&offset=${lastOffset}`;



   return {
      firstPage: firstPage,
      next: nextPage,
      previous: prevPage,
      lastPage: lastPage
   };
};



module.exports = {
   processPaginationLinks
};