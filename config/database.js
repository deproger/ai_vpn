const { Sequelize } = require("sequelize");
const config = require("./config.json");

// Определите среду (development, test, production)
const environment = process.env.NODE_ENV || "development";
const { username, password, database, host, dialect, port } =
  config[environment];

// Создайте экземпляр Sequelize
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
});

sequelize
  .authenticate()

  .then(() => {
    console.log(
      "Connection to the database has been established successfully."
    );
  })

  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Экспортируйте экземпляр Sequelize
module.exports = sequelize;
