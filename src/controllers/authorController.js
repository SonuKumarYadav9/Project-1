const author = require('../models/authorModel');
// const jwt = require("jsonwebtoken");

const createAuthor = async function(req, res) {
    try {
    let getAuhorData = req.body;
    let savedAuhorData = await author.create(getAuhorData);
    res.status(201).send({status: true, data: savedAuhorData});
    } catch (err) {
        res.status(500).send({status: false, msg: err.message});
    }
};

module.exports.createAuthor = createAuthor;