
const author = require('../models/authorModel');
const jwt = require('jsonwebtoken');

const authentication = async function (req, res, next) {
    try {    ///// check token 
        let token = req.headers["x-api-key"]
        if (!token) req.headers["x-api-key"]
        if (!token) return res.status(401).send({ status: false, msg: "Token Must be Filled" })
        console.log(token);
        // verify token
        let decodedToken = jwt.verify(token, "functionUp-project1");
        if (!decodedToken) return res.status(400).send({ status: false, msg: "Token Not Verified Please Enter Valid Token" })
        // find Author  by AuthorId
        let authorId = req.params.authorId
        if(!authorId)  return res. status(404).send({status:false, msg:"Author Not Found"})
          // find author detail fron authorId
        let authorDetail = await author.findById(authorId);
        if (!authorDetail) return res.status(404).send({ status: false, msg: "Author Detail Not exist  " })
     res.status(200).send({status: true, msg:"Author Authenticated Succesfully "})
     next();
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message });
    }
};

const authorization = async(req, res, next) => {
    try {
        let token = req.headers["x-api-key"];
        
        if(!token) return res.status(404).send({ status:false, msg: "token must be present "});

        let decordedToken = jwt.verify(token, "functionUp-project1");
        if(!decordedToken) return res.status(404).send({ status: false, msg: "token is not valid"});
        let authorToBeModified = req.params.authorId;
        let authorLoggedIn = decordedToken.authorId;
        if(authorToBeModified != authorLoggedIn) {
            return res.status(404).send({ status: false, msg: "user logged is not allowed to modify the requested authors data"})
        }
        next();
    } catch(err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

module.exports.authorization = authorization;
module.exports.authentication = authentication;