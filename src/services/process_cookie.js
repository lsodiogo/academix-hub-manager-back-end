function setCookie(res, cookieData) {
   
   // Data to be added to cookie
   const jsonCookieData = JSON.stringify(cookieData);
   console.log(jsonCookieData);

   res.cookie("LoggedIn", jsonCookieData, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      signed: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000) //1day
   });
};


function verifyCookie(req) {
   if (req.signedCookies.LoggedIn) {
      const data = JSON.parse(req.signedCookies.LoggedIn);

      return data;
   };
};


module.exports = {
   setCookie,
   verifyCookie
};