const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Config = sequelize.define("Config", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Config;
