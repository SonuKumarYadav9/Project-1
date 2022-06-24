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
      let id = req.params.blogId
      let data = req.body
      let {title, body, subCategory, tags} = data;
      let updateQuery = { title: title, body: body, isPublished: true, publishedAt: new Date() }
      let addQuery = { tags: tags, subCategory: subCategory }
      let blogData = await blog.findById(id)
      let keys = Object.keys(data) 
      let temp = 0;
      //when no body is given
      if (keys.length === 0)
          return res.status(400).send({ status: false, msg: "No Data is given for updation" })

      //when query parametrs have attributes other than authorId,body,tags or subcategory
      for (let i = 0; i < keys.length; i++) {
          if (keys[i] == "title" || keys[i] == "body" || keys[i] == "tags" || keys[i] == "subCategory")
              temp++;
      }
      if (keys.length > 0 && temp !== keys.length)
          return res.status(400).send({ status: false, msg: "Invalid Request!! Query cannot have attribute other than title, body, tags or subcategory" })

      
      if (blogData.isDeleted)
          return res.status(404).send({ status: false, msg: "Blog is already Deleted" })

      let getData = await blog.findOneAndUpdate({ _id: id }, { $set: updateQuery, $push: addQuery }, { new: true, upsert: true })

      res.status(200).send({ status: true, data: getData })
  }
  catch (error) {
      res.status(500).send({ status: false, msg: error.message })
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
