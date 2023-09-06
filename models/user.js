const getDb = require("../util/database").getDb;
const mongodb = require("mongodb");

class user {
  constructor(name, email, cart = { items: [] }, id) {
    this.name = name;
    this.email = email;
    this.cart = cart; // {items : []}
    this._id = id;
  }
  save() {
    const db = getDb();
    db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new mongodb.ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db
      .collection("users")
      .updateOne(
        { _id: new mongodb.ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
  }
  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((p) => p.productId);
    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        // Use the plural "products" variable
        return products.map((p) => {
          const cartItem = this.cart.items.find(
            (item) => item.productId.toString() === p._id.toString()
          );
          return {
            ...p,
            quantity: cartItem ? cartItem.quantity : 0,
          };
        });
      })
      .catch((e) => console.log(e));
  }

  deleteItemFromCart(id) {}

  static findById(id) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(id) })
      .then((user) => {
        return user;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = user;