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
    let savedAuhorData = await author.create(getAuhorData);
    res.status(201).send({status: true, data: savedAuhorData});
    } catch (err) {
        res.status(500).send({status: false, msg: err.message});
    }
};




const authorOftitle = async function (req, res) {
    let data = await BooksModel.findOneAndUpdate({name :"Two states"},{$set :{prices:100}},{new:true})
    let authorData =await AuthorModel.find({author_id:data.author_id}).select("author_name")
    let price =data.prices
    res.send({msg:authorData, price})

}



    const getBooksbyChetanBhagat = async function (req, res) {
        let data = await AuthorModel.find({author_name :"Chetan Bhagat"}).select("author_id")
        let bookData = await BooksModel.find({author_id :data[0].author_id})
        res.send({msg :bookData})
    }
module.exports.createAuthor = createAuthor;










// const author = require('../models/authorModel');
// // const jwt = require("jsonwebtoken");

// const createAuthor = async function(req, res) {
//     try {
//     let getAuhorData = req.body;
//     let savedAuhorData = await author.create(getAuhorData);
//     res.status(201).send({status: true, data: savedAuhorData});
//     } catch (err) {
//         res.status(500).send({status: false, msg: err.message});
//     }
// };

// module.exports.createAuthor = createAuthor;