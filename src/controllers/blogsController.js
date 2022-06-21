const blog = require('../models/blogModel');
// const jwt = require("jsonwebtoken");

const createBlog = async function(req, res) {
    try {
    let getBlogData = req.body;
    let savedBlogData = await blog.create(getBlogData);
    res.status(201).send({status: true, data: savedBlogData});
    } catch (err) {
        res.status(500).send({status: false, msg: err.message});
    }
};

module.exports.createBlog = createBlog;