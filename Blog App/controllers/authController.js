const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

// Register user
module.exports.registerUser = async (req, res) => {
  try {
    let { username, name, email, password } = req.body;
    const profileImg = req.file ? req.file.buffer : null;
    let findUser = await userModel.findOne({ email: email });
    if (findUser) {
      return res
        .status(401)
        .send("You already have an account. Please log in.");
    } else {
      const salt = await bcrypt.genSalt(12);
      const hash = await bcrypt.hash(password, salt);
      const user = await userModel.create({
        profileImg,
        username,
        name,
        email,
        password: hash,
      });
      const token = generateToken(user);
      res.cookie("token", token);
      res.send("User created successfully");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// Login user
module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    req.send("Email & Password is incorrect");
    return res.redirect("/register");
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.render("index");
    } else {
      req.send("Email & Password is incorrect");
      return res.redirect("/register");
    }
  });
};

// Logout user
module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
