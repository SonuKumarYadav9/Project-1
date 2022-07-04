    const author = require('../models/authorModel');

                       const jwt = require("jsonwebtoken");

                       const validateEmail = require('email-validator');


//===================================CREATE AUTHOR===========================================


const createAuthor = async function(req, res) {
    try {
       let getAuhorData = req.body;
          let {fName, lName, title, email, password} = getAuhorData;
             if(!fName) return res.status(400).send({status: false, msg: "fName is missing"});
                if(fName == 0) {
                   return res.status(400).send({status: false, msg: "Enter authors First Name"});
                    }
                      if(!lName) return res.status(400).send({status: false, msg: "lName is missing"});
                       if(lName == 0) {
                         return es.status(400).send({status: false, msg: "Enter authors Last Name"});
                           }
                           if(!title) return res.status(400).send({status: false, msg: "title is missing"});    
                          if(title == 0) { 
                       return res.status(400).send({status: false, msg: "Enter title of the book"});  
                      }  
                    if(!email) return res.status(400).send({status: false, msg: "Email is missing"});
                  if(email == 0) {
                 return res.status(400).send({ status: false, msg: "Enter a valid email id"});
                }
             if(!validateEmail.validate(req.body.email)) return res.status(400).send({ status: false, msg: "Enter a valid email "}); 
           req.body.email = req.body.email.toLowerCase();

         if(!password) return res.status(400).send({status: false, msg: "password is missing"});
    if(password == 0) {
        return res.status(400).send({ status: false, msg: "Enter a valid password" });
    }                                 
    let savedAuhorData = await author.create(getAuhorData);
              res.status(201).send({status: true, data: savedAuhorData});
              } catch (err) {
        res.status(500).send({status: false, msg: err.message});
    }
};


//===================================lOGIN  ||||||| AUTHOR===========================================


let loginAuthor = async function (req,res) {
    try {
       let {email,password} = req.body;

                if(!email) return res.status(400).send({status: false, msg: 'please provide valid email id'});

                    if(!password) return res.status(400).send({status: false, msg: 'please provide valid password'})

                let authors = await author.findOne({ email: email, password: password });
            if(!authors) return res.send({
        status: false, msg: "email or the password is not correct",
    });

    let token = jwt.sign(
        {
            authorId: author._id,               //
                     project: 1,                //   PAYLOAD
                         group: "group-2",      //
        },
                              "functionUp-project1"   // SECRET KEY
    );
    res.setHeader('x-api-key', token);      // SETTING HEADER
            console.log(token);
                          return res.status(200).send({ status: true, data: {token} });
           } catch(err) {
   res.status(500).send({ msg: "Error", msg: err.message })
    }  
};

                         module.exports.loginAuthor = loginAuthor;
                         module.exports.createAuthor = createAuthor;
