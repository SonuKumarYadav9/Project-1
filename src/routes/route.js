const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogsController");

router.get("/test-me", function (req, res) {
    res.send("My first ever Api to Check Working Or Not !")
})

router.post("/createAuthor", authorController.createAuthor);

router.post("/createBlog", blogController.createBlog);

router.delete("/blogs:blogId", blogController.deletedBlog);

module.exports = router;