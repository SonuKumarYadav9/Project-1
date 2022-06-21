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

// 51 to 53 line
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
        res.status(200).send({status: true  msg: "Blg deleted Succesfully"})
    } catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};


module.exports.createBlog = createBlog
module.exports.getBooks = getBooks
module.exports.deletedBlog = deletedBlog