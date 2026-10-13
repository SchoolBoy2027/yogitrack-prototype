
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
const dashboardInstructorRoutes = require("./src/routes/dashboard_instructor");
const dashboardManagerRoutes = require("./src/routes/dashboard_manager");
const classAttendanceRoutes = require("./src/routes/class_attendance");
const instructorPayRoutes = require("./src/routes/instructor_pay");

const loginRoutes = require("./src/routes/login");
const BLogic = require("./src/library/BLogic");
const Dbg = require("./src/library/Dbg");

const path = require("path");
const START_FRONTEND = true;           //set prior to deployment

path.join(__dirname, "../client/dist");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


/**
 * Middle ware alert!  Since we don't have access to scheduled 
 * tasks, run this update on every access.  
 */
app.use("/api", async (req, res, next) => {
    try {
        await BLogic.checkExpiredCustomers();
        next();
    } catch (error) {
        console.error("Error checking expired customers:", error);
        next(error);
    }
});

app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/yoga_classes", yoga_classRoutes);
app.use("/api/class_packages", class_packageRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/dashboard-main", dashboardMainRoutes);
app.use("/api/dashboard-instructor", dashboardInstructorRoutes);
app.use("/api/dashboard-manager", dashboardManagerRoutes);
app.use("/api/attendance", classAttendanceRoutes);
app.use("/api/reports/instructor-pay", instructorPayRoutes);



if (START_FRONTEND) {
    // Serve React frontend
    const frontendPath = path.join(__dirname, "../client/dist");

    app.use(express.static(frontendPath));

    // React Router fallback
    app.get("/{*splat}", (req, res) => {
        res.sendFile(path.join(frontendPath, "index.html"));
    });

   Dbg.LogIt("React frontend enabled");
} else {
    Dbg.LogIt("React frontend disabled, start manually! ");
}

    const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    Dbg.LogIt(`Server running on port ${PORT}`);
});
