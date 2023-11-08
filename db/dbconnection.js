const mongoose = require("mongoose");
let dev_db_url = 'mongodb+srv://sathish:hfvqi0ZP8c7cpqWQ@cluster0.urej5qj.mongodb.net/book';

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
