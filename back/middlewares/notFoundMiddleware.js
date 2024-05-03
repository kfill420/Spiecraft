const notFoundMiddlewar = (req, res, next) => {
  res.status(404).json({ error: "Data not found." });
  next();
}

module.exports = notFoundMiddlewar;