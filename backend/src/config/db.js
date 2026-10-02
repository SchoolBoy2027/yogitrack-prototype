const mongoose = require("mongoose");
require("dotenv").config();
//todo fix this, not sure why I can't use the dotenv constants
MONGO_URI = 'mongodb+srv://johnrcox1_db_user:bLN9lSwVDD3VySIk@cluster0.i4qpc1f.mongodb.net/yogitrack'
//MONGO_URI = 'mongodb://localhost:27017/yogitrack'


const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log('MongoDB connected ');
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
