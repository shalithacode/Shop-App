//Import modules
const express = require("express");
const path = require("path");
const rootDir = require("./util/path");
const bodyParser = require("body-parser");
const app = express();
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);

app.use(errorController.get404Page);
app.listen(3000);
