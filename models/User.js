const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Импортируйте ваш экземпляр Sequelize

class User extends Model {
  static async createIfNotExists(userData) {
    const [user, created] = await User.findOrCreate({
      where: { chatId: userData.chatId },

      defaults: userData,
    });

    return user; // Возвращаем пользователя (существующего или нового)
  }
}

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
    modelName: "User",
  }
);

module.exports = User;
