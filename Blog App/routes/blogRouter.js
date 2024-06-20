const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const upload = require("../config/multer-config");
const {
  createBlog,
  readBlog,
  getEditBlog,
  postEditBlog,
  deleteBlog,
} = require("../controllers/blogController");

router.get("/create", isLoggedIn, (req, res) => {
  res.render("createblog");
});

router.get("/read/:id", readBlog);

router.get("/edit/:id", isLoggedIn, getEditBlog);
router.post("/edit/:id", isLoggedIn, upload.single("image"), postEditBlog);

router.post("/delete/:id", isLoggedIn, deleteBlog);

router.post("/create", isLoggedIn, upload.single("image"), createBlog);

module.exports = router;
