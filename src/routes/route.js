const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogsController");
const middleware = require("../middlewares/auth")

let { authentication, authorization } = middleware;
// ---------- Create Author Api ---------
router.post("/createAuthor", authorController.createAuthor); 

// ---------- Create Blog Api ------------ 
router.post("/createBlog",blogController.createBlog);  

// ---------- Login Author Api -----------
router.post("/login", authorController.loginAuthor);

// ---------- Get Blogs Api -------------
router.get("/getBlogs",authentication,blogController.getBlogs);  

// ------- Get Updated Blogs using blogId ------
router.put("/getBlogs/:blogId", authorization ,blogController.updatedBlogs);

// ---------- Delete Api ---------------
router.delete("/blogs/:blogId", authorization,blogController.deletedBlog);

// ---------- Delete Blogs By Query ----------
router.delete("/blogs",authorization, blogController.deletedByQueryParams);

module.exports = router; 