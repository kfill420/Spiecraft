const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class User extends Model { }

User.init({
  email: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "product"
});

module.exports = User;