const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    let { username, name, email, password } = req.body;
    let findUser = await userModel.findOne({ email: email });
    if (findUser) {
      return res
        .status(401)
        .send("You Already Have An Account, Please Login...");
    } else {
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) return res.send(err);
          let user = userModel.create({
            username,
            name,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          res.send("User Created Successfully");
        });
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) {
    res.send("Email & Password is incorrect");
    return res.redirect("/register");
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/");
    } else {
      res.send("Email & Password is incorrect");
      return res.redirect("/register");
    }
  });
};

module.exports.logout = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
