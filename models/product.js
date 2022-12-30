const fs = require("fs");
const path = require("path");
const rootDir = require("../util/path");

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
  constructor(title) {
    this.title = title;
  }

  save() {
    getProductFromFile((products) => {
      products.push(this);
      fs.writeFile(productFilePath, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }
};
