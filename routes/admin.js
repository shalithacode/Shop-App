const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><label for="name">Product name:</label><br><input type="text" id="name" name="title" ><br><input type="submit" value="Add Product"></form>'
  );
});
router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
