const { Router } = require("express")
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");

const mainRouter = new Router();

mainRouter.use(productRouter);
mainRouter.use(userRouter);

mainRouter.use(notFoundMiddlewar);

function notFoundMiddlewar(req, res, next) {
  res.status(404).json({ error: "Data not found." });
  next();
}

module.exports = mainRouter;