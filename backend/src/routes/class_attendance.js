const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const BLogic = require("../library/BLogic");

console.log("CLASS ATTENDANCE ROUTES LOADED");
router.get("/", async (req, res) => {
    try {
        const collection = mongoose.connection.collection("class_atttendance");

        const dashboardCards = await collection
            .find({ is_active: true })
            .sort({ order: 1 })
            .toArray();

        res.json(dashboardCards);
    } catch (error) {
        console.error("Error fetching dashboard cards:", error);
        res.status(500).json({
            message: "Error fetching dashboard cards",
            error: error.message
        });
    }
});

module.exports = router;
