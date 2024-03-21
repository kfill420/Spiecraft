const sanitizeHtml = require("sanitize-html");
const Product = require("../models/product");

async function getAllProduct(req, res) {
  const products = await Product.findAll();
  res.json(products);
}

module.exports = {
  getAllProduct
};