
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
    let { title, body, authorId, category } = getBlogData;
    if (!title) return res.status(404).send({ status: false, msg: "Title must be filled " });
    if (!body) return res.status(404).send({ status: false, msg: "Body must be filled" });
    if (!category) return res.status(404).send({ status: false, msg: "Category must be present" });

    let getAuthorData = await author.findById(getBlogData.authorId);
    console.log(authorId);
    if (!getAuthorData) return res.status(400).send({ status: false, msg: "No such author exists " });

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

    let getBlogs = await blog.find({ $and: [{ $and: [{ isDeleted: false }, { isPublished: true }] }, { $or: [{ authorId: { $in: data.authorId } }, { category: { $in: [data.category] } }, { tags: { $in: [data.tags] } }, { subCategory: { $in: [data.subCategory] } }] }] });

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
    let { title, body, subCategory, tags } = data;
    let updateQuery = { title: title, body: body, isPublished: true, publishedAt: new Date() }
    let addQuery = { tags: tags, subCategory: subCategory }
    let blogData = await blog.findById(id)
    let keys = Object.keys(data)
    let temp = 0;
    console.log(temp)
    if (addQuery.tags == 0) return res.status(404).send({ status: false, msg: "Value of Tags must be Present" })
    if (addQuery.subCategory == 0) return res.status(404).send({ status: false, msg: " Value of Subcategory must be Present" })
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

    let getData = await blog.findOneAndUpdate({ _id: id }, { $set: updateQuery, $push: addQuery }, { new: true })

    res.status(200).send({ status: true, data: getData })
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

// ==========> DeeleteBlog <=======================

const deletedBlog = async function (req, res) {
  try {
    let BlogId = req.params.blogId
    let findData = await blog.findById(BlogId)
    if (!findData)
      return res.status(404).send({ status: false, message: "no such blog exists" })
    if (findData.isDeleted)
      return res.status(404).send({ status: false, msg: "Blog is already deleted" })
    let deletedata = await blog.findOneAndUpdate({ _id: BlogId }, { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true, upsert: true })
    console.log(deletedata)
    res.status(200).send({ status: true, data: deletedata, msg: " Blog Deleted Succesfully" })
  }
  catch (error) {
    res.status(500).send({ status: false, msg: error.message })
  }
}

// ========> Delete Blogs with query params <========== 
let deletedByQueryParams = async function (req, res) {
  try {
    let data = req.query;

    if (data) {
      let deletedBlogsFinal = await blog.updateMany(
        { $in: data },
        { $set: { isDeleted: false }, deletedAt: Date.now() },
        { new: true }
      );

      res.status(200).send({ status: true, result: deletedBlogsFinal,  msg: "All Matched Data Are Deleted" });
    } else {
      res.status(400).send({ status: false, msg: "Its a Bad Request " });
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





















       // if (Object.keys(blogId).length == 0)
        //     return res.status(400).send({ status: false, msg: "Blog is required" });



 // if (Object.keys(blogId).length == 0)
        //     return res.status(400).send({ status: false, msg: "Blog is required" });



// const deletedQueryParams= async function(req,res){
//     try {
//         let queryParams = req.query
//         // if (Object.keys(queryParams).length == 0)
//         // return res.status(400).send({ status: false, msg: "Blog is required" });        // reqest from params to blogId
//       let {category, authorId, tags, subCategory, isPublished,} =queryParams
//       if(!category) return res.status(400).send({msg:  "category is required"})
//       if(!authorId) return res.status(400).send({msg:  "authorID is required"})
//       if(!isPublished) return res.status(400).send({msg:  "subCategory is required"})
//       if(!subCategory) return res.status(400).send({msg:  "isPublished is required"})
//           let blogs = await blog.findOneAndUpdate({_id:authorId , category : category,isPublished: false , subCategory:Sub,tags: tags ,new : true })
//       // let blogs = await blog.findOneAndUpdate({ _id: blogId, isDeleted: false, deletedAt: null, new : true})
//     if (!blogs) return res.status(404).send({ status: false, msg: "Blog Not Found" })
//     console.log(blogs)
//     res.status(200).send({status: true , msg:"Query Deleted  Succesfully" ,blog })
// } catch (err) {
//     res.status(500).send({ status: false, msg: err.message });
// }
// }
// let queryDeleted = async function(req, res) {
//     try {
//         let Data = req.query
//         let filter = {...Data}
//         if (!Data) return res.status(404).send({ status: false, msg: "query params is not given " })
//         let blogvalidation = await blog.findOne(filter)
//         if (!blogvalidation) return res.status(404).send({ status: false, msg: "blog does not exist" })
//         if (blogvalidation.isDeleted == true) return res.status(404).send({ status: false, msg: "  Please Provide Blog Id" })
//         if (blogvalidation.isDeleted == false) {
//             // let idList = blogvalidation._id
//             // console.log(idList)
//             let deletion = await blog.findOneAndUpdate(filter,{ $set:{ isDeleted: true ,deletedAt:null }})
//             return res.status(200).send({ status: true, msg: "blog is deleted successfully",deletion })
//         }
//     } catch (err) {
//         res.status(500).send({ status: false, msg: err.message });
//     }
