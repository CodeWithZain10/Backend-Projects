const userModel = require("../models/user");
const blogModel = require("../models/blog");

module.exports.profile = async (req, res) => {
  let user = await userModel.findById(req.user._id).populate("blogs");
  res.render("profile", { user: user });
};
