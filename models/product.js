const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");
const Cart = require("./cart");

const productFilePath = path.join(rootDir, "data", "products.json");
function getProductFromFile(cb) {
  fs.readFile(productFilePath, (err, data) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(data));
    }
  });
}

module.exports = class Product {
  constructor(id, title, imgUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imgUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductFromFile((products) => {
      if (this.id) {
        const exsistingProductIndex = products.findIndex(
          (p) => p.id === this.id
        );
        const updatedProduct = [...products];
        updatedProduct[exsistingProductIndex] = this;
        fs.writeFile(productFilePath, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(productFilePath, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }

  static findById(id, cb) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      cb(product);
    });
  }
  static deleteById(id) {
    getProductFromFile((products) => {
      const product = products.find((p) => p.id === id);
      const updateProducts = products.filter((p) => p.id !== id);
      fs.writeFile(productFilePath, JSON.stringify(updateProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }
};
