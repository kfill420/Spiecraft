const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class ProductCart extends Model { }

ProductCart.init({
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "product",
      key: "id"
    }
  },
  cart_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "cart",
      key: "id"
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  }
}, {
  sequelize,
  tableName: "product_cart"
});

module.exports = ProductCart;