const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddprouduct = (req, res, next) => {
  const { title, imgUrl, price, description } = req.body;
  const product = new Product(null, title, imgUrl, price, description);
  product.save();
  res.redirect("/");
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if (!editMode) return res.redirect("/");

  const prodId = req.params.productId;

  Product.findById(prodId, (product) => {
    if (!prodId) res.redirect("/");

    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};
exports.postEditProduct = (req, res, next) => {
  const { id, title, imgUrl, price, description } = req.body;
  const updatedProduct = new Product(id, title, imgUrl, price, description);
  updatedProduct.save();
  res.redirect("/admin/products");
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
