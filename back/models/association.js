const Cart = require("./Cart");
const Users = require("./Users");
const Product = require("./Product");
const ProductCart = require("./ProductCart");

// Sequelize : 
// - One-To-One : hasOne + belongsTo
// - One-To-Many : hasMany + belongsTo
// - Many-To-Many : belongsToMany + belongsToMany

Cart.hasMany(ProductCart, { foreignKey: 'cart_id' });
ProductCart.belongsTo(Cart, { foreignKey: 'cart_id' });

Product.hasMany(ProductCart, { foreignKey: 'product_id' });
ProductCart.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { Cart, Users, Product, ProductCart };