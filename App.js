const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><label for="name">Product name:</label><br><input type="text" id="name" name="title" ><br><input type="submit" value="Add Product"></form>'
  );
});
app.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>Home</h2>");
});

app.listen(3000);
