const path = require("path");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const User = require("./models/user");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("64fb798abf72e3a9c26ab6e2")
    .then((user) => {
      req.user = user;
      req.isLoggedIn = req.get("Cookie").trim().split("=")[1];
      next();
    })
    .catch((e) => console.log(e));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONOGDB_USER}:${process.env.MONOGDB_PASSWORD}@node-cluster.dkal6pa.mongodb.net/shop?retryWrites=true&w=majority`
  )
  .then((result) => {
    console.log("DB conneccted");
    app.listen(3000);
  })
  .catch((e) => console.log(e));
