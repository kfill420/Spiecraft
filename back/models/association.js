const Cart = require("./Cart");
const Users = require("./Users");
const Product = require("./Product");

// Sequelize : 
// - One-To-One : hasOne + belongsTo
// - One-To-Many : hasMany + belongsTo
// - Many-To-Many : belongsToMany + belongsToMany


module.exports = { Cart, Users, Product };