const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const {
  loginUser,
  registerUser,
  logout,
} = require("../controllers/authController");
const { profile } = require("../controllers/profileController");
const isLoggedIn = require("../middlewares/isLoggedIn");

// Routes
router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/profile", isLoggedIn, profile);

router.post("/register", upload.single("profileImg"), registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
