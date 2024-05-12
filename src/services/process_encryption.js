const argon2 = require("argon2");


async function createHash(password) {
   try {
      // To create an encrypted password
      const hash = await argon2.hash(password);
      return hash;

   } catch(error) {
      console.log(error);
      return undefined;
   };
};


async function verifyHash(hash, password) {
   try {
      // To verify the encrypted password
      const result = await argon2.verify(hash, password);    
      return result;

   } catch(error) {
      console.log(error);
      return false;
   };
};


module.exports = {
   createHash,
   verifyHash
}