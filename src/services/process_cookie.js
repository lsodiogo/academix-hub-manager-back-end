function setCookie(res, cookieData) {
   const jsonCookieData = JSON.stringify(cookieData);

   res.cookie("LoggedIn", jsonCookieData, {
      httpOnly: true,
      sameSite: "none",
      secure: true
   });
};



module.exports = {
   setCookie
};