const path = require("path");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoose = require("mongoose");
const session = require("express-session");
const MongodbStore = require("connect-mongodb-session")(session);

const MONGODB_URI = `mongodb+srv://${process.env.MONOGDB_USER}:${process.env.MONOGDB_PASSWORD}@node-cluster.dkal6pa.mongodb.net/shop?retryWrites=true&w=majority`;

const app = express();
const store = new MongodbStore({ uri: MONGODB_URI, collection: "sessions" });

const Users = require("./models/user");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  Users.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((e) => console.log(e));
});
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("DB conneccted");
    app.listen(3000);
  })
  .catch((e) => console.log(e));
