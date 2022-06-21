const express = require('express')
const bodyParser = require('body-parser');
const route = require('./routes/route');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let url = "mongodb+srv://blog:3Fqahtt9OzUSEnER@cluster0.rjlj8bj.mongodb.net/blog";
let port = process.env.PORT || 3000;

mongoose.connect(url, {
    useNewUrlParser: true
}).then( () => console.log("MongoDb is connected" ))
.catch( err => console.log(err) )

app.use('/', route) 

app.listen(port, function () {
    console.log('Express app running on port' + port);
});
