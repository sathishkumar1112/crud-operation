const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
// files
const dbConnect = require('./db/dbconnection');
const book =  require ('./controller.js');
//dbconnection 

app.use(cors());
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Accept', 'application/json');
    next();
  }
  app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(bodyParser.json({ limit: '50mb' }));


let dev_db_url = 'mongodb+srv://sathish:hfvqi0ZP8c7cpqWQ@cluster0.urej5qj.mongodb.net/book';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
// var options = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function callback() {
  console.log("MongoDB connection success");
});
// routes
app.use('/',book)

//port
const port = 4444;
app.listen(port,()=>{
    console.warn(`application running on ${port}`);
})