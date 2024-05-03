const express = require("express")
const session = require("express-session");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const cartRouter = require("./cartRouter");
const sessionMiddleware = require("../middlewares/sessionMiddleware");
const notFoundMiddleware = require("../middlewares/notFoundMiddleware");

const app = new express();

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: process.env.SESSION_SECRET,
  cookie: { secure: false }
}));

app.use(express.urlencoded({ extended: true }));

app.use(productRouter);
app.use(userRouter);
app.use(cartRouter);

app.use(notFoundMiddleware);

module.exports = app;