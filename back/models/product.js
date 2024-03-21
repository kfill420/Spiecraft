const { DataTypes, Model } = require("sequelize");
const sequelize = require("../database");

class Product extends Model { }

Product.init({
  name: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  weight: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  },
  price: {
    type: DataTypes.ARRAY(DataTypes.DECIMAL),
    allowNull: false
  },
  image_url: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: "product"
});

module.exports = Product;