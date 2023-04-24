const router = require("express").Router();
const jwt = require("jsonwebtoken");

const userController = require("../controllers/user");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/login", userController.login);

router.post("/register", userController.register);
module.exports = router;
