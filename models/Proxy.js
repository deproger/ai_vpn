const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Импортируйте ваш экземпляр Sequelize

class Proxy extends Model {}

Proxy.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    port_http: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    port_socks5: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    period: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Proxy", // Имя модели
    // tableName: "proxies",
    // timestamps: true,
  }
);

module.exports = Proxy;
