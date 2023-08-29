const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "shalitha165", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
