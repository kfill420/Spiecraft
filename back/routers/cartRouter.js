const { Router } = require("express")
const cartController = require("../controllers/cartController");
const cw = require("./ControllerErrorWrapper");

const router = new Router();

router.get("/cart/:userId", cw(cartController.getCart));
router.post("/cart", cw(cartController.addToCart));
router.delete("/cart/:userId/:productId", cw(cartController.removeFromCart));

module.exports = router;