const express = require("express");
const router = express.Router();
const {
  loginUser,
  registerUser,
  logout,
} = require("../controllers/authController");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
