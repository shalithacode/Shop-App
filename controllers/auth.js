const User = require("../models/user");
const bcrypt = require("bcryptjs");
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
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (!userDoc) return res.redirect("/login");
      bcrypt
        .compare(password, userDoc.password)
        .then((isMatch) => {
          if (isMatch) {
            req.session.user = userDoc;
            req.session.isLoggedIn = true;
            return req.session.save((err) => {
              console.log(err);
              res.redirect("/");
            });
          }
          res.redirect("/login");
        })
        .catch((err) => {
          console.log(err);
          return res.redirect("/login");
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

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
    isAutheticated: false,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) return res.redirect("/signup");

      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          user.save();
        })
        .then((result) => res.redirect("/login"));
    })

    .catch((err) => console.log(err));
};
