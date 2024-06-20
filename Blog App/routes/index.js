  const express = require("express");
  const router = express.Router();
  const blogModel = require("../models/blog");

  router.get("/", async (req, res) => {
    try {
      let blogs = await blogModel.find().populate("user");
      res.render("index", { blogs });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  });

  module.exports = router;
