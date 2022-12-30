const express = require("express");
const path = require("path");
// const rootDir = require("../util/path");
const productsController = require("../controllers/product");
const router = express.Router();

router.get("/add-product", productsController.getAddProduct);

router.post("/add-product", productsController.postAddprouduct);

exports.router = router;
