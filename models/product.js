const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");
module.exports = class Product {
  constructor(id, title, imageUrl, description, price, userId) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this.id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this.id) }, { $set: this });
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    dbOp
      .then(() => {
        console.log("prodcut was added");
        return;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((product) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
