function setCookie(res, cookieData) {
   
   // Data to be added to cookie
   const jsonCookieData = JSON.stringify(cookieData);

   res.cookie("LoggedIn", jsonCookieData, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      signed: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) //1day
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