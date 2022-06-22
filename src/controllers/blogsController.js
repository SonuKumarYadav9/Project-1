
const blog = require('../models/blogModel');
const jwt = require("jsonwebtoken");
const blogModel = require('../models/blogModel');


const getBooks = async function (req, res) {
    try {
        let getBlogData = req.body;
        if (Object.keys(getBlogData).length == 0)
            return res.status(400).send({ status: false, msg: "Data is required to create a blog" });

        // checking that the below data is present or not
        let { title, body, authorId, category } = getBlogData;   // Destucturing data
        if (!title) return res.status(400).send({ status: false, msg: "Title must be filled" });
        if (!body) return res.status(400).send({ status: false, msg: "Body must be filled" });

        let getAuthorData = await author.findById(getBlogData.authorId);
        console.log(authorId);
        if (!getAuthorData) return res.status(404).send({ status: false, msg: "No such author exists" });
        if (!category) return res.status(400).send({ status: false, msg: "Category must be present" });
        let savedBlogData = await blog.create(getBlogData);
        res.status(201).send({ status: true, data: savedBlogData });
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};

//   const updatedBlog = async function (req,res){
//        try {
//          let blog = req.body
//          let {title,body ,tags,subcategory} = blog


//         //  if (!blog) return res.status(400).send ("Blog Not Found")


//         //  let blog = await blogModel.findById(blogId)
//        } catch (error) {

//        }

//   }

===============> UpdatedBlogs <=========================================

const updatedBlogs = async function (req, res) {
  try {
    let blogId = req.params.blogId
    let blogs = await blog.findById(blogId)
    console.log(blogs)
    if (!blogs) {
      return res.status(404).send({ status: "false", msg: "No such blog exists " })
    };
    let isDelete = blogs.isDeleted;
    if (isDelete == true) {
      return res.status(200).send({ msg: true, data: "blog document is already deleted" })
    }

    let body = req.body
    let published = blog.isPublished
    console.log(published)
    if (published == true && Object.keys(body) != 0) {

      let result = await blog.findOneAndUpdate({ _id: blog._id }, body, { new: true })
      console.log(result)
      res.status(200).send({status: true, data: result })
    }
    else if (published == true && Object.keys(body) == 0) {
      res.status(400).send({ msg: "already published" })
    } else if (published == false && Object.keys(body) != 0) {
      let result = await blog.findOneAndUpdate({ _id: blog._id }, {$set: {isDeleted: true}, publishedAt: Date.now() }, { new: true })
      console.log(result)
      res.send({ data: result })
    } else {
      let result = await blog.findOneAndUpdate({ _id: blog._id }, body, { new: true })
      console.log(result)
      res.status(200).send({status: true, data: result })
    }
  }
  catch (err) {
    console.log(err.message)
    res.status(500).send({ msg: "error", error: err.message })
  }
}

==========> DeeleteBlog <=======================

// 51 to 53 line
const deletedBlog = async function (req, res) {
    try {
        let params = req.params          // reqest from params to blogId
        let blogId = params.blogId
        if (Object.keys(blogId).length == 0)
            return res.status(400).send({ status: false, msg: "Blog is required" });
        //find By ID blog is present or not
        let blogs = await blog.findOneAndUpdate({ _id: blogId, isDeleted: false, deletedAt: null, new : true})
        if (!blogs) return res.status(404).send({ status: false, msg: "Blog Not Found" })
        console.log(blogs)
        res.status(200).send({status: true , msg:"Blog deleted Succesfully" ,blog })
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};


module.exports.createBlog = createBlog
module.exports.getBooks = getBooks
module.exports.deletedBlog = deletedBlog
