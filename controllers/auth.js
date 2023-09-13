exports.getLogin = (req, res, next) => {
  if (!req.isLoggedIn) {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAutheticated: req.isLoggedIn,
    });
  } else {
    res.redirect("/");
  }
};
exports.postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};
