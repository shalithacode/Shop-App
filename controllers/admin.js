const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};

exports.postAddprouduct = (req, res, next) => {
  const { title, imgUrl, price, description } = req.body;
  const product = new Product(title, imgUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      pageTitle: "All Products",
      prods: products,
      path: "/admin/products",
      hasProducts: products.length > 0,
    });
  });
};
