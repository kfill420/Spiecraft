const Cart = require("./cart");
const Users = require("./users");
const Product = require("./product");

// Sequelize : 
// - One-To-One : hasOne + belongsTo
// - One-To-Many : hasMany + belongsTo
// - Many-To-Many : belongsToMany + belongsToMany


module.exports = { Cart, Users, Product };