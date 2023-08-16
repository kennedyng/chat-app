const router = require("express").Router();
const jwt = require("jsonwebtoken");
const checkAuth = require("../middlewares/checkAuth");
const multer = require("multer");
const userController = require("../controllers/user");
const { storage } = require("../utils/storage");

const upload = multer({ storage });

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/profile", checkAuth, userController.getProfile);

router.post(
  "/profile/create",
  upload.single("profile_pic"),
  checkAuth,
  userController.createProfile
);

router.put(
  "/profile/edit",
  upload.single("profile_pic"),
  checkAuth,
  userController.editProfile
);

module.exports = router;
