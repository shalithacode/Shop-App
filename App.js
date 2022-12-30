const express = require("express");
const path = require("path");
const rootDir = require("./util/path");
const bodyParser = require("body-parser");
const app = express();
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

app.use("/admin", adminData.router);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});
app.listen(3000);
