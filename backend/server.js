
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
process.env.config = dotenv.config();
const connectDB = require("./db");

const userRoutes = require("./src/routes/user");
const customerRoutes = require("./src/routes/customer");
const saleRoutes = require("./src/routes/sale");
const yoga_classRoutes = require("./src/routes/yoga_class");
const class_packageRoutes = require("./src/routes/class_package");
const dashboardMainRoutes = require("./src/routes/dashboard_main");
const loginRoutes = require("./src/routes/login");
const path = require("path");
const START_FRONTEND = true;           //set prior to deployment

path.join(__dirname, "../client/dist");



connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/yoga_classes", yoga_classRoutes);
app.use("/api/class_packages", class_packageRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/dashboard-main", dashboardMainRoutes);



if (START_FRONTEND) {
    // Serve React frontend
    const frontendPath = path.join(__dirname, "../client/dist");

    app.use(express.static(frontendPath));

    // React Router fallback
    app.get("/{*splat}", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });

    console.log("React frontend enabled");
} else {
    console.log("React frontend disabled, start manually! ");
}

    const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
