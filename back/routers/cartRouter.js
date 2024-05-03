const { Router } = require("express")
const cartController = require("../controllers/cartController");
const cw = require("./ControllerErrorWrapper");

const router = new Router();

router.get("/cart", cw(cartController.getCart));
router.post("/cart", cw(cartController.addToCart));

module.exports = router;