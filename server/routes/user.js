const router = require("express").Router();
const jwt = require("jsonwebtoken");
const checkAuth = require("../middlewares/checkAuth");
const multer = require("multer");
const userController = require("../controllers/user");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/profile");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png") {
    cb(null, true);
  } else {
    console.log("ddd");
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, //5 MB
  },
});

router.post("/login", userController.login);

router.post("/register", userController.register);

router.get("/profile", checkAuth, userController.getProfile);

router.post(
  "/profile/edit",
  upload.single("profile_pic"),
  checkAuth,
  userController.editProfile
);

// router.post(
//   "/profile/upload",
//   upload.single("file"),
//   checkAuth,
//   userController.createProfilePic
// );
module.exports = router;
