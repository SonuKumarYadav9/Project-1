const author = require('../models/authorModel');
const jwt = require("jsonwebtoken");
const validateEmail = require('email-validator');

const createAuthor = async function(req, res) {
    try {
    let getAuhorData = req.body;

    let {fName, lName, title, email, password } = getAuhorData;



    if (!fName) return res.status(401).send({status: false, msg: "First Name Missing"})

    if(fName == 0) {
        return res.status(400).send({status: false, msg: "Enter authors First Name"});
    }
    if (!lName) return res.status(401).send({status: false, msg: "Last Name Missing"})

    if(lName == 0) {
        return res.status(400).send({status: false, msg: "Enter authors Last Name"});
    } 
    
    if (!title) return res.status(401).send({status: false, msg: " Title is  Missing"})

    if(title == 0) { 
        return res.status(400).send({status: false, msg: "Enter title of the book"});  
    }
    if (!email) return res.status(401).send({status: false, msg: "Email is Missing"})

    if(email == 0) {
        return res.status(400).send({ status: false, msg: "Enter a valid email"});
    }
    if(!validateEmail.validate(req.body.email)) return res.status(400).send({ status: false, msg: "Please Provide  Correct Email"}); 
    req.body.email = req.body.email.toLowerCase();

    if (!password) return res.status(401).send({status: false, msg: "Password is Missing"})

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
        let email = req.headers.email;
        let password = req.headers.password;

        if(!email) return res.status(400).send({status: false, msg: 'please provide valid email id'});

        if(!password) return res.status(400).send({status: false, msg: 'please provide valid password'})

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


module.exports.loginAuthor = loginAuthor;
module.exports.createAuthor = createAuthor;

// const authorAuthentication = async function (req, res) {
//     try {    ///// check token 
//         let token = req.headers["x-api-key"]
//         if (!token) req.headers["x-api-key"]
//         if (!token) return res.status(404).send({ status: false, msg: "Token Must be Filled" })
//         console.log(token)
//         // verify token
//         let decodedToken = jwt.verify(token, "functionUp-project1")
//         if (!decodedToken) return res.status(400).send({ status: false, msg: "Token Not Verified Please Enter Valid Token" })
//         //find Author
//         let authorId = req.params.authorId
//         if(!authorId)  return res. status(404).send({status:false, msg:"Author Not Found"})
//         let authorDetail = await author.findById(authorId)
//         if (!authorDetail) return res.status(404).send({ status: false, msg: "Author Detail Not exist  " })
//      res.status(200).send({status: true, msg:"Author Authenticated Succesfully "})
//     }
//     catch (err) {
//         res.status(500).send({ status: false, msg: err.message });
//     }
// };




// module.exports.createAuthor = createAuthor;
// module.exports.loginAuthor = loginAuthor;
