const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware");
const connectionRouter = require("./connectionRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const notFoundMiddleware = require("../middlewares/notFoundMiddleware");

const router = express.Router();

router.use(connectionRouter);
router.use(productRouter);

// Authentification needed
router.use(authMiddleware, userRouter);
router.use(authMiddleware, cartRouter);

router.use(notFoundMiddleware);

module.exports = router;