const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Импортируйте ваш экземпляр Sequelize

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    chatId: {
      type: DataTypes.BIGINT,
      allowNull: false, // Исправлено с null: false на allowNull: false
    },
  },
  {
    sequelize,
    modelName: "User ", // Убедитесь, что здесь нет лишних пробелов
  }
);

module.exports = User;
