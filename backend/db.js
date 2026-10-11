const mongoose = require("mongoose");
const BLogic = require("./src/library/BLogic");
const Dbg = require("./src/library/Dbg");


Dbg.LogIt2("MONGO_URI exists:", !!process.env.MONGO_URI);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        Dbg.LogIt('MongoDB connected ');
    } catch (error) {
            Dbg.LogIt("MongoDB connection failed:");
            Dbg.LogIt("Name:", error.name);
            Dbg.ConsoleErr("Message:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
