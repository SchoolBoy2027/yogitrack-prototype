
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

const userRoutes = require("./src/routes/user");
const customerRoutes = require("./src/routes/customer");
const path = require("path");
path.join(__dirname, "../client/dist");

process.env.config = dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);

// Serve React frontend
const frontendPath = path.join(__dirname, "../client/dist");

app.use(express.static(frontendPath));

// React Router fallback
app.get("/{*splat}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
