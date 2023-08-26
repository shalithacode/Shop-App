const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const cartFilePath = path.join(rootDir, "data", "cart.json");

module.exports = class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(cartFilePath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const existingProduct = cart.products.find((prod) => prod.id === id);
      if (existingProduct) {
        existingProduct.qty += 1;
      } else {
        cart.products.push({ id: id, qty: 1 });
      }
      cart.totalPrice += productPrice;

      fs.writeFile(cartFilePath, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(cartFilePath, (err, fileContent) => {
      if (err) return;

      let cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((p) => p.id === id);
      if (!product) return;

      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter((p) => p.id !== id);
      updatedCart.totalPrice = updatedCart.totalPrice - price * productQty;

      fs.writeFile(cartFilePath, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
};
