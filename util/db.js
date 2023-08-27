const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  database: "node-complete",
  user: "root",
  password: "shalitha165",
});

module.exports = pool.promise();
