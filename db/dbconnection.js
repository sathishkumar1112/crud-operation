const mongoose = require("mongoose");
let dev_db_url = 'mongodb+srv://sathish:hfvqi0ZP8c7cpqWQ@cluster0.urej5qj.mongodb.net/book';

const mongoDB = process.env.MONGODB_URI || dev_db_url;
const connectDB = async () => {
    try {
        const options = {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
    
        await mongoose.connect(mongoDB, options);
    
        const db = mongoose.connection;
    
        db.on('error', (err) => {
          console.error('MongoDB connection error:', err);
        });
    
        db.once('open', () => {
          console.log('MongoDB connection success');
        });
        
    
        return db; 
    }
        catch (error) {
            console.error('MongoDB connection error:', error);
            throw error; 
          }
}

module.exports = connectDB;
// https://wild-red-coral-shoe.cyclic.app
// https://wild-red-coral-shoe.cyclic.app