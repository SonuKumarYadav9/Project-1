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
    if(password == 0) {
        return res.status(400).send({ status: false, msg: "Enter a valid password"});
    }                                 
    let savedAuhorData = await author.create(getAuhorData);
    res.status(201).send({status: true, data: savedAuhorData});
    } catch (err) {
        res.status(500).send({status: false, msg: err.message});
    }
};

let loginAuthor = async function (req,res) {
    try {
        let email = req.heders.email;
        let password = req.headers.password;

        // if(!email) return res.status(400).send({status: false, msg: 'please provide valid email id'});

        // if(!password) return res.status(400).send({status: false, msg: 'please provide valid password'})

        let authors = await author.findOne({ email: email, password: password });
        if(!authors) return res.send({
        status: false, msg: "email or the password is not correct",
    });

    let token = jwt.sign(
        {
            authorId: author._id,
            project: 1,
            group: "group-2",
        },
        "functionUp-project1"
    );
    res.setHeader('x-api-key', token);
    console.log(token);
    res.status(201).send({ status: true, data: {token} });
    } catch(err) {
        res.status(500).send({ msg: "Error", msg: err.message })
    }  
};
const authorAuthentication = async function (req, res) {
    try {    ///// check token 
        let token = req.headers["x-api-key"]
        if (!token) req.headers["x-api-key"]
        if (!token) return res.status(404).send({ status: false, msg: "Token Must be Filled" })
        console.log(token)
        // verify token
        let decodedToken = jwt.verify(token, "functionUp-project1")
        if (!decodedToken) return res.status(400).send({ status: false, msg: "Token Not Verified Please Enter Valid Token" })
        // find Author
        let authorId = req.params.authorId
        if(!authorId)  return res. status(404).send({status:false, msg:"Author Not Found"})
        let authorDetail = await author.findById(authorId)
        if (!authorDetail) return res.status(404).send({ status: false, msg: "Author Detail Not exist  " })
     res.status(200).send({status: true, msg:"Author Authenticated Succesfully "})
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};

module.exports.loginAuthor = loginAuthor;
module.exports.createAuthor = createAuthor;
