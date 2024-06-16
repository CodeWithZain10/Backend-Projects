const jwt = require("jsonwebtoken");
const userModel = require("../models/user");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    res.status(401).send("You need to login first");
    return; // Ensure that you stop further execution
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({
        email: decoded.email,
      })
      .select("-password"); // Ensure this is awaited

    if (!user) {
      return res.status(401).send("User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};
