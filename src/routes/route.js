const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogsController");

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor);

router.post("/createBlog", blogController.createBlog);
router.get("/createBlog", blogController.createBlog);


module.exports = router;