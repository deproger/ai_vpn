const { Sequelize } = require("sequelize");
const config = require("./config.json");

// Определите среду (development, test, production)
const environment = process.env.NODE_ENV || "development";
const { username, password, database, host, dialect } = config[environment];

// Создайте экземпляр Sequelize
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
});

// Экспортируйте экземпляр Sequelize
module.exports = sequelize;
