const cookie = require('cookie');

function setCookie(res, cookieData, rememberMe) {
   
   // Data to be added to cookie
   const jsonCookieData = JSON.stringify(cookieData);

   res.cookie("LoggedIn", jsonCookieData, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      signed: true,
      partitioned: true,
      maxAge: rememberMe ? new Date(Date.now() + 24 * 60 * 60 * 1000) : null // 1 day of validation
   });
};


function verifyCookie(req) {

   // To verify cookie
   if (req.signedCookies.LoggedIn) {
      const data = JSON.parse(req.signedCookies.LoggedIn);

      return data;
   };
};


function clearCookie(req, res) {

   // To clear cookie
   if (req.signedCookies.LoggedIn) {
      const result = res.clearCookie("LoggedIn");

      return result;
   };
};


module.exports = {
   setCookie,
   verifyCookie,
   clearCookie
};