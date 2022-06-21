const blog = require("../models/blogModel");
// const jwt = require("jsonwebtoken");
const author = require("../models/authorModel");

// =================> CREATE BLOGS <==========================

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

const getBlogs =  async function (req, res){
  let authorData =req.query.authorId
  let categoryData =req.query.subcategory
  let tagsData = req.query.tag
  let getBlogDetail = await blog.find({isdeleted:false, isPublished:true})
  if(!getBlogDetail) return res.status(404).send({Status:false, msg:"Document not found"})
  res.Status(200).send({Status:true, data: getBlogDetail})
  let queryBlog = await blog.find({$and:[{authorId:authorData},{category: categoryData},{subCategory: subCategoryData}]})
  if(!queryBlog) return  res.status(404).send({Status:false, msg:"Document not found"})
  res.Status(200).send({Status:true, data:queryBlog})

}







// const update = async function (req, res) {
    
//   let userId = req.params.userId;
//   let user = await userModel.findById(userId);
//   //Return an error if no user with the given id exists in the db
//   if (!user) {
//     return res.send("No such user exists");
//   }

//   let userData = req.body;
//   let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
//   res.send({ status: updatedUser, data: updatedUser });
// };


// module.exports.createBlog = createBlog;
// module.exports.getBlogs = getBlogs;












// const blog = require('../models/blogModel');
// // const jwt = require("jsonwebtoken");

// const createBlog = async function(req, res) {
//     try {
//     let getBlogData = req.body;
//     let savedBlogData = await blog.create(getBlogData);
//     res.status(201).send({status: true, data: savedBlogData});
//     } catch (err) {
//         res.status(500).send({status: false, msg: err.message});
//     }
// };

// module.exports.createBlog = createBlog;