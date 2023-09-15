const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    res.render("auth/login", {
      path: "/login",
      pageTitle: "Login",
      isAutheticated: req.session.isLoggedIn,
    });
  } else {
    res.redirect("/");
  }
};
exports.postLogin = (req, res, next) => {
  User.findById("64fb798abf72e3a9c26ab6e2")
    .then((user) => {
      req.session.user = user;
      req.session.isLoggedIn = true;
      req.session.save((err) => {
        console.log(err);
        res.redirect("/");
      });
    })
    .catch((e) => console.log("User not found"));
};
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
  });
};
