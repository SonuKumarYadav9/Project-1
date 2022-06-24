const express = require('express');
const router = express.Router();
const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogsController");
const middleware = require("../middlewares/auth")

let { authentication, authorization } = middleware;
// ---------- Create Author Api ---------
<<<<<<< HEAD
router.post("/createAuthor", authorController.createAuthor); 

// ---------- Create Blog Api ------------ 
router.post("/createBlog",blogController.createBlog);  
=======
router.post("/createAuthor", authorController.createAuthor);
>>>>>>> 6f7b1b475acfed7e62ed1214820e8e65a508a4ca

// ---------- Login Author Api -----------
router.post("/login", authorController.loginAuthor);

<<<<<<< HEAD
// ---------- Get Blogs Api -------------
router.get("/getBlogs",authentication,blogController.getBlogs);  

// ------- Get Updated Blogs using blogId ------
router.put("/getBlogs/:blogId", authorization ,blogController.updatedBlogs);

// ---------- Delete Api ---------------
router.delete("/blogs/:blogId", authorization,blogController.deletedBlog);

// ---------- Delete Blogs By Query ----------
router.delete("/blogs",authorization, blogController.deletedByQueryParams);

module.exports = router; 
=======
// ---------- Create Blog Api ------------ 
router.post("/createBlog", authentication ,blogController.createBlog);

// ---------- Get Blogs Api -------------
router.get("/getBlogs", authentication ,blogController.getBlogs);

// ------- Get Updated Blogs using blogId ------
router.put("/getBlogs/:blogId", authentication, authorization ,blogController.updatedBlogs);

// ---------- Delete Api ---------------
router.delete("/blogs:blogId", authentication, authorization, blogController.deletedBlog);

// ---------- Delete Blogs By Query ----------
router.delete("/blogs", blogController.deletedByQueryParams);

module.exports = router;
>>>>>>> 6f7b1b475acfed7e62ed1214820e8e65a508a4ca
