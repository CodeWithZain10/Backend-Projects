const blogModel = require("../models/blog");
const userModel = require("../models/user");

module.exports.createBlog = async (req, res) => {
  try {
    let { title, content } = req.body;
    const image = req.file ? req.file.buffer : null;

    // Assuming req.user contains the authenticated user
    if (!req.user) {
      return res.status(401).send("Unauthorized");
    }

    let blog = await blogModel.create({
      user: req.user._id, // Associate blog with user
      title,
      content,
      image,
    });

    // Update the user's blogs array
    await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { blogs: blog._id } },
      { new: true }
    );

    res.redirect("/user/profile");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports.readBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogModel.findById(blogId).populate("user");

    if (!blog) {
      return res.status(404).send("Blog Not Found");
    }

    res.render("readblog", { blog });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getEditBlog = async (req, res) => {
  try {
    let blog = await blogModel.findById(req.params.id);
    if (!blog) {
      return res.status(404).send("Blog Not Found");
    }

    res.render("editblog", { blog });
  } catch (error) {
    console.log(error);
  }
};

module.exports.postEditBlog = async (req, res) => {
  try {
    let { title, content } = req.body;
    const image = req.file ? req.file.buffer : null;

    let updateData = { title, content };
    if (image) {
      updateData.image = image;
    }

    let blog = await blogModel.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!blog) {
      return res.status(404).send("Blog Not Found");
    }

    res.redirect(`/blog/read/${blog._id}`);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteBlog = async (req, res) => {
  try {
    await blogModel.findByIdAndDelete(req.params.id);
    res.redirect("/user/profile");
  } catch (error) {
    console.log(error);
  }
};
