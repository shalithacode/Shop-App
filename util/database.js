require("dotenv").config();

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = async (callback) => {
  try {
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.MONOGDB_USER}:${process.env.MONOGDB_PASSWORD}@node-cluster.dkal6pa.mongodb.net/shop?retryWrites=true&w=majority`
    );
    console.log("MongoDB Connected.");
    _db = client.db();
    callback();
  } catch (e) {
    console.error(e);
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw new Error("Database not found!");
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
