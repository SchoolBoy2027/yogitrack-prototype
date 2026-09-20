const mongoose = require("mongoose");
//const dotenv = require(".env");
//todo fix this 
//MONGO_URI='mongodb+srv://johnrcox1_db_user:bLN9lSwVDD3VySIk@cluster0.i4qpc1f.mongodb.net/'
MONGO_URI='mongodb://localhost:27017/'

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
