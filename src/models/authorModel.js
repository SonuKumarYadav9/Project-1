const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema( {
    fName : {
        type: String,
        required: true
    },
    lName : {
        type: String,
        required: true,
    },    
    title : {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        unique: true,
    }, 
}, { timestamps: true });

module.exports = mongoose.model('author',authorSchema);


// { fname: { mandatory}, lname: {mandatory}, title: {mandatory, enum[Mr, Mrs, Miss]}, email: {mandatory, valid email, unique}, password: {mandatory} }