const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
// files
const dbConnect = require('./db/dbconnection');
const book =  require ('./controller.js');
//dbconnection 
dbConnect();
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
// routes
app.use('/',book)

//port
const port = 4444;
app.listen(port,()=>{
    console.warn(`application running on ${port}`);
})