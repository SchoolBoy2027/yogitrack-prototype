const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const BLogic = require("../library/BLogic");
const ClassAttendance = require("../models/Class_Attendance");
const Customer = require("../models/Customer");

console.log("CLASS ATTENDANCE ROUTES LOADED");
/*pulls the class info for the select box and automates */
router.get("/", async (req, res) => {
    try {
        const attendance = await ClassAttendance.find()
            .sort({ yoga_class_date: 1, start_time: 1 })
            .select(
                "yoga_class_id yoga_class_date start_time instructor_id instructor_name customers"
            )
            .lean();

        const report = attendance.map((item) => ({
            yoga_class_id: item.yoga_class_id,
            yoga_class_date: item.yoga_class_date,
            start_time: item.start_time,
            instructor_id: item.instructor_id,
            instructor_name: item.instructor_name,
            number_of_students: item.customers.length
        }));

        res.status(200).json(report);
    } catch (error) {
        console.error("Error retrieving attendance report:", error);

        res.status(500).json({
            message: "Unable to retrieve attendance report."
        });
    }
});

//add the attendance list to the permenant record
/*
router.put("/", async (req, res) => {
    try {
        const {
            yoga_class_id,
            yoga_class_type,
            yoga_class_date,
            instructor_id,
            instructor_name,
            start_time,
            end_time,
            customers
        } = req.body;

        if (!yoga_class_id || !Array.isArray(customers)) {
            return res.status(400).json({
                message: "Yoga class ID and customers are required."
            });
        }

        const classDate = new Date(yoga_class_date).toISOString().slice(0, 10);

        const attendance = await ClassAttendance.findOneAndUpdate(
            { yoga_class_id },
            {
                yoga_class_id,
                yoga_class_type,
                yoga_class_date,
                instructor_id,
                instructor_name,
                start_time: new Date(`${classDate}T${start_time}:00`),
                end_time: new Date(`${classDate}T${end_time}:00`),
                customers
            },
            {
                new: true,
                upsert: true,
                runValidators: true,
                setDefaultsOnInsert: true
            }
        );

        res.status(200).json({
            message: "Attendance list saved successfully.",
            attendance
        });
    } catch (error) {
        console.error("Error saving class attendance:", error);

        res.status(500).json({
            message: "Unable to save attendance list."
        });
    }
});

*/

//add the attendance list to the permenant record
//add the attendance list to the permenant record
router.put("/", async (req, res) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const {
            yoga_class_id,
            yoga_class_type,
            yoga_class_date,
            instructor_id,
            instructor_name,
            start_time,
            end_time,
            customers
        } = req.body;

        if (!yoga_class_id || !Array.isArray(customers)) {
            throw new Error("Yoga class ID and customers are required.");
        }

        const existingAttendance = await ClassAttendance.findOne({
            yoga_class_id
        }).session(session);

        if (existingAttendance) {
            throw new Error("Attendance list has already been submitted.");
        }

        const classDate = new Date(yoga_class_date).toISOString().slice(0, 10);

        const attendance = new ClassAttendance({
            yoga_class_id,
            yoga_class_type,
            yoga_class_date,
            instructor_id,
            instructor_name,
            start_time: new Date(`${classDate}T${start_time}:00`),
            end_time: new Date(`${classDate}T${end_time}:00`),
            customers
        });

        const savedAttendance = await attendance.save({ session });

        const notificationCustomers = [];

        for (const item of customers) {
            const customer = await Customer.findOne({
                customer_id: item.customer_id
            }).session(session);

            if (!customer) {
                throw new Error("Customer not found: " + item.customer_id);
            }

            if (customer.balance <= 0) {
                throw new Error("Insufficient balance: " + item.customer_id);
            }

            customer.balance -= 1;

            await customer.save({ session });

            notificationCustomers.push(customer);
        }

        await session.commitTransaction();

        let notificationsSent = 0;
        let notificationsFailed = 0;

        for (const customer of notificationCustomers) {
            try {
                await BLogic.sendAttendanceNotification(customer, savedAttendance);
                notificationsSent++;
            } catch (error) {
                notificationsFailed++;

                console.error(
                    "Notification failed for:",
                    customer.customer_id,
                    error.message
                );
            }
        }

        res.status(200).json({
            message: "Attendance list saved successfully.",
            attendance: savedAttendance,
            notificationsSent,
            notificationsFailed
        });

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }

        console.error("Error saving class attendance:", error);

        let status = 400;
        let message = error.message;

        if (
            error.message === "Attendance list has already been submitted." ||
            error.code === 11000
        ) {
            status = 409;
            message = "Duplicate attendance list. This class has already been submitted.";
        }

        res.status(status).json({
            message
        });

    } finally {
        await session.endSession();
    }
});


//find the attendance list of a single class
router.get("/:yoga_class_id", async (req, res) => {
    try {
        const attendance = await ClassAttendance.findOne({
            yoga_class_id: req.params.yoga_class_id
        }).select("yoga_class_id yoga_class_date customers").lean();

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance record not found."
            });
        }

        res.status(200).json(attendance);
    } catch (error) {
        console.error("Error retrieving class attendance:", error);

        res.status(500).json({
            message: "Unable to retrieve class attendance."
        });
    }
});

module.exports = router;
