const { Cart } = require("../models");

async function getCart(req, res) {
  const carts = await Cart.findAll();
  res.json(carts);
}

async function addToCart(req, res) {
  const carts = await Cart.findAll();
  res.json(carts);
}

module.exports = {
  getCart,
  addToCart
};