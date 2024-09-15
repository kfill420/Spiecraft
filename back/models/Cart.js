const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Cart extends Model { }

Cart.init({
  users_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "users",
      key: "id"
    }
  }
}, {
  sequelize,
  tableName: "cart"
});

module.exports = Cart;