const { Router } = require("express")
const userController = require("../controllers/userController");
const cw = require("./ControllerErrorWrapper");

const router = new Router();

router.post("/signup", cw(userController.signupUser));
router.post("/signin", cw(userController.signinUser));
router.get("/loggedIn", cw(userController.loggedIn));

module.exports = router;