const author = require('../models/authorModel');
// const jwt = require("jsonwebtoken");
const validateEmail = require('email-validator');

const createAuthor = async function(req, res) {
    try {
    let getAuhorData = req.body;
    let {fName, lName, title, email} = getAuhorData;
    if(fName == 0) {
        return res.status(400).send({status: false, msg: "Enter authors First Name"});
    }
    if(lName == 0) {
        return es.status(400).send({status: false, msg: "Enter authors Last Name"});
    }    
    if(title == 0) { 
        return res.status(400).send({status: false, msg: "Enter title of the book"});  
    }    
    if(email == 0) {
        return res.status(400).send({ status: false, msg: "Enter a valid email id"});
    }
    if(!validateEmail.validate(req.body.email)) return res.status(400).send({ status: false, msg: "Enter a valid email "}); 
    req.body.email = req.body.email.toLowerCase();
    let savedAuhorData = await author.create(getAuhorData);
    res.status(201).send({status: true, data: savedAuhorData});
    } catch (err) {
        res.status(500).send({status: false, msg: err.message});
    }
};
module.exports.createAuthor = createAuthor;
