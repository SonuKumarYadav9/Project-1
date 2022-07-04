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
    if (!title)
      return res
        .status(400)
        .send({ status: false, msg: "Title must be filled" });
    if (!body)
      return res
        .status(400)
        .send({ status: false, msg: "Body must be filled" });

    let getAuthorData = await author.findById(getBlogData.authorId);
    console.log(authorId);
    if (getAuthorData == 0)
      return res.status(400).send({ status: false, msg: "Mising authorId" });
    if (!getAuthorData)
      return res
        .status(404)
        .send({
          status: false,
          msg: "No such author exists please provide authorId",
        });
    if (!category)
      return res
        .status(400)
        .send({ status: false, msg: "Category must be present" });
    let savedBlogData = await blog.create(getBlogData);
    res.status(201).send({ status: true, data: savedBlogData });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

// =================> GET BLOGS <=======================

const getBlogs = async (req, res) => {
  try {
    let data = req.query;

    // if (Object.keys(data).length == 0) { //   let getAllBlogs = await blog.find(//     isDeleted: false//     isPublished: true,//   }) //   if (!getAllBlogs)
    //     return res
    //       .status(404)
    //       .send({ status: false, msg: "No such blog exist" });
    // return res.status(200).send({ status: true, data: getAllBlogs });
  
    let getBlogs = await blog.find({
      $and: [
        { $and: [{ isDeleted: false }, { isPublished: true }] },
        {
          $or: [
            { authorId: { $in: data.authorId } },
            { category: { $in: [data.category] } },
            { tags: { $in: [data.tags] } },
            { subCategory: { $in: [data.subCategory] } },
          ],
        },
      ],
    });

    if (getBlogs.length == 0)
      return res.status(400).send({ status: false , msg: "No such blog exist" });
    res.status(200).send({ status: true, data: getBlogs ,msg:"Blog Data Filtered Succesfully" });
  } catch (err) {
    res.status(500).send({ status: false, error: err.message });
  }
};

// ===============> Update Blogs <==================

const updateBlogs = async function (req, res) {
  try {
    let blogId= req.params.blogId
      let { title, body, tags, subCategory } = req.body;
        const date = Date.now();
         if(Object.keys(req.body).length == 0) return res.status(400).send({status: false, msg: "Body Must be filled for Updation"});
        //  if(!Object.keys(req.body)) return res.status(400).send({status: false, msg: " Lenght Must be filled for Updation"});
          
         if(!blogId) return res.status(404).send({status:false , msg:"Blog Is Not Found , Please Enter Valid Blog Id"})
    //  if(!title) return res.status(400).send({status: false, msg: " Spelling of keys should be in this format - 'title','body','tags','subCategory' "});
  if(title === 0 )  return res.status(400).send({status: false, msg: "Value of the title Must be present "});
if(body == 0 )  return res.status(400).send({status: false, msg: "Value of the title Must be present "});
   if(tags == 0 )  return res.status(400).send({status: false, msg: "Value of the tags Must be present "});
     if(subCategory == 0 )  return res.status(400).send({status: false, msg: "Value of the SubCategory Must be present "});
           
        let updateQuery = {title: title ,body: body,}
          let addQuery = { tags: tags, subCategory: subCategory };
               const allBlogs = await blog.findOne({
                  $and: [{ isDeleted: false} ,{isPublished: true }],
                      });
                      if (!allBlogs)
                      return res
                      .status(404)
                      .send({ status: false, msg: "No Possible filters are available" });
                                 // console.log(allBlogs)
                      // WE ARE FINDING ONE BY BLOG ID AND UPDATING //
                      let updatedblog = await blog.findOneAndUpdate(
                      { _id: blogId },
                    { $set: updateQuery, $push: addQuery, publishedAt: date},
               { new: true }
             ); 
          // console.log(updatedblog) 
        res
     .status(200)
  .send({ status: true, msg: "Blog is Updated Successfully", data: updatedblog });
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};


// ==============> Delete Blog <=======================

const deletedBlog = async function (req, res) {
  try {
    let blogid = req.params.blogId;
      let findData = await blog.findById(blogid);
        if (!findData) return res.status(404).send({ status: false, message: "no such blog exists" });
            if (findData.isDeleted) return res.status(404).send({ status: false, msg: "Blog is already deleted" });
          let deletedata = await blog.findOneAndUpdate(
      { _id: blogid },  // find
   { $set: { isDeleted: true, deletedAt: new Date() } },  //condition
 { new: true }    // new data
    );
    res
      .status(200)
          .send({
            status: true,
             data: deletedata,
           msg: "Blog deleted successfully",
        });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

// ============> Delete Blogs with query params <==========
let deletedByQueryParams = async function (req, res) {
  try {
    let data = req.query;
        if (Object.keys(data).length == 0) {
           return res.status(400).send({status: false, msg : "Please enter  any query"})
             }
  let deleteData = await blog.updateMany(
      { isDeleted: false, data },
        { isDeleted: true },
         { new: true }
)
            res.status(200).send({ status: true, result: deleteData, msg: "All matched data has been deleted" });
    
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

module.exports.getBlogs = getBlogs;
           module.exports.deletedBlog = deletedBlog;
                    module.exports.createBlog = createBlog;
           module.exports.updateBlogs = updateBlogs;
module.exports.deletedByQueryParams = deletedByQueryParams;
