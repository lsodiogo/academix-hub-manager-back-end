function processPaginationLinks(limit, offset, totalItems, tableNameParam) {

   const firstOffset    = 0;
   const nextOffset     = offset + limit;
   const previousOffset = offset - limit;
   const lastOffset     = Math.floor((totalItems / limit)) * limit - 1;


   let firstPage = null;
   let prevPage = null;
   let nextPage = null;
   let lastPage = null;
   

   // To build the first and previous page link
   if (previousOffset >= 0) {
      firstPage = `http://localhost:3000/${tableNameParam}/?limit=${limit}&offset=${firstOffset}`;
      prevPage = `http://localhost:3000/${tableNameParam}/?limit=${limit}&offset=${previousOffset}`;
   };

   // To make sure when the offset is changed in the URL, while clicking "previous" can go back to the very first result
   if (offset > 0 && offset < limit) {
      firstPage = `http://localhost:3000/${tableNameParam}/?limit=${limit}&offset=${firstOffset}`;
      prevPage = firstPage;
   };
   

   // To build the next and last page
   if (nextOffset < totalItems) {
      nextPage = `http://localhost:3000/${tableNameParam}/?limit=${limit}&offset=${nextOffset}`;
      lastPage = `http://localhost:3000/${tableNameParam}/?limit=${limit}&offset=${lastOffset}`;
   };


   return {
      firstPage: firstPage,
      previous: prevPage,
      next: nextPage,
      lastPage: lastPage
   };
};


module.exports = {
   processPaginationLinks
};