const { Product } = require("../models");

async function getAllProduct(req, res) {
  const products = await Product.findAll();
  res.json(products);
}

module.exports = {
  getAllProduct
};