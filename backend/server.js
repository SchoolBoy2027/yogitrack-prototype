
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

const userRoutes = require("./src/routes/user");
const customerRoutes = require("./src/routes/customer");


process.env.config=dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);


app.get("/", (req, res) => {
    res.json({
        message: "MERN backend is running!"
    });
});

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
