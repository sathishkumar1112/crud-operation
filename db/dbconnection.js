const mongoose = require("mongoose");
let dev_db_url = 'mongodb://localhost:27017/test';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const connectDB = async () => {
    try{
    await mongoose.connect(mongoDB);
    console.warn("MongoDB connection success");
} catch(error){
    console.error('MongoDB connection error:', error);
}
}
module.exports = connectDB;