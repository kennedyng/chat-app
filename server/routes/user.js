const router = require("express").Router();
const jwt = require("jsonwebtoken");
const checkAuth = require("../middlewares/checkAuth");

const userController = require("../controllers/user");

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/profile", checkAuth, userController.getProfile);

module.exports = router;
