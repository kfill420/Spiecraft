const { Router } = require("express")
const productController = require("../controllers/productController");
const cw = require("./ControllerErrorWrapper");

const router = new Router();

router.get("/products", cw(productController.getAllProduct));

module.exports = router;