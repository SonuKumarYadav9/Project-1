const blog = require("../models/blogModel");
const author = require("../models/authorModel");

// =================> CREATE BLOGS <====================

const createBlog = async function (req, res) {
  try {
    let getBlogData = req.body;
    if (Object.keys(getBlogData).length == 0)
      return res
        .status(400)
        .send({ status: false, msg: "Data is required to create a blog" });

    // checking that the below data is present or not
    let {title, body, authorId, category} = getBlogData;
    if(!title) return res.status(400).send({status: false, msg: "Title must be filled" });
    if(!body) return res.status(400).send({status: false, msg: "Body must be filled"});

    let getAuthorData = await author.findById(getBlogData.authorId);
    console.log(authorId);
    if(!getAuthorData) return res.status(404).send({status: false, msg: "No such author exists"});
    if(!category) return res.status(400).send({status: false, msg: "Category must be present"});
    let savedBlogData = await blog.create(getBlogData);
    res.status(201).send({ status: true, data: savedBlogData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


// =================> GET BLOGS <=======================

const getBlogs = async (req, res) => {
  try {
    let data = req.query

    if (Object.keys(data).length == 0) {
      let getAllBlogs = await blog.find({ isDeleted: false, isPublished: true });
      if (!getAllBlogs) return res.status(404).send({ status: false, msg: "No such blog exist" });
      return res.status(200).send({ status: true, data: getAllBlogs })
    }

    let getBlogs = await blog.find({ $and: [{ $and: [{ isDeleted: false }, { isPublished: true }] }, { $or: [{ authorid: data.authorid }, { category: { $in: [data.category] } }, { tags: { $in: [data.tags] } }, { subCategory: { $in: [data.subCategory] } }] }] });

    if (getBlogs.length == 0) return res.status(200).send({ status: true, msg: "No such blog exist" });
    res.status(200).send({ status: true, data: getBlogs })
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
}

// ===============> Update Blogs <================== 

const updatedBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId
    let blogs = await blog.findById(blogId)
    console.log(blogs)
    if (!blogs) {
      return res.status(404).send({ status: false, msg: "No such blog exists " })
    };
    let isDelete = blogs.isDeleted;
    if (isDelete == true) {
      return res.status(200).send({ msg: true, data: "blog document is already deleted" })
    }

    let body = req.body
    let published = blog.isPublished
    console.log(published)
    if (published == true && Object.keys(body) != 0) {

      let result = await blog.findOneAndUpdate({ _id: blogId }, body, { new: true })
      console.log(result)
      res.status(200).send({status: true, data: result })
    }
    else if (published == true && Object.keys(body) == 0) {
      res.status(400).send({ msg: "already published" })
    } else if (published == authorIdfalse && Object.keys(body) != 0) {
      let result = await blog.findOneAndUpdate({ _id: blogId }, {$set: {isDeleted: true}, publishedAt: Date.now() }, { new: true })
      console.log(result)
      res.send({ data: result })
    } else {
      let result = await blog.findOneAndUpdate({ _id: blogId }, body, { new: true })
      console.log(result)
      res.status(200).send({status: true, data: result })
    }
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: "error", error: err.message })
  }
}

// ==========> DeeleteBlog <=======================

const deletedBlog = async function (req, res) {
  try {
      let params = req.params          // reqest from params to blogId
      let blogId = params.blogId
      if (Object.keys(blogId).length == 0)
          return res.status(400).send({ status: false, msg: "Blog Id Not Found" });
      // find By ID blog is present or not
      let blog = await blogModel.findById({ _id: blogId, isDeleted: false, deletedAt: null })
      if (!blog) return res.status(404).send({ status: false, msg: "Blog Not Found" })
      console.log(blog)
      res.status(200).send({status: true ,msg: "Blg deleted Succesfully"})
  } catch (err) {
      res.status(500).send({ status: false, msg: err.message });
  }
};

// ========> Delete Blogs with query params <========== 
let deletedByQueryParams = async function (req, res) {
  try {
    let data = req.query;

    if (data) {
      let deletedBlogsFinal = await blog.updateMany(
        { $in: data },
        { $set: { isDeleted: true }, deletedAt: Date.now() },
        { new: true }
      );
      
      res.status(200).send({ status: true, result: deletedBlogsFinal });
    } else {
      res.status(400).send({ status: false, ERROR: "BAD REQUEST" });
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
}
};

module.exports.getBlogs = getBlogs;
module.exports.deletedBlog = deletedBlog;
module.exports.createBlog = createBlog;
module.exports.updatedBlogs = updatedBlogs;
module.exports.deletedByQueryParams = deletedByQueryParams; 
