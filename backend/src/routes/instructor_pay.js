
const express = require("express");
const router = express.Router();
const ClassAttendance = require("../models/Class_Attendance");


console.log("INSTRUCTOR_PAY ROUTES LOADED");


router.get("/", async (req, res) => {
    try {
        const selectedDate = req.query.date;

        if (!selectedDate || !/^\d{4}-\d{2}-\d{2}$/.test(selectedDate)) {
            return res.status(400).json({
                message: "A valid report date is required"
            });
        }

        const [year, month, day] = selectedDate.split("-").map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));

        if (
            date.getUTCFullYear() !== year ||
            date.getUTCMonth() !== month - 1 ||
            date.getUTCDate() !== day
        ) {
            return res.status(400).json({
                message: "Invalid report date"
            });
        }

        const startDate = new Date(Date.UTC(year, month - 2, 1));
        const endDate = new Date(Date.UTC(year, month - 1, 1));

        const results = await ClassAttendance.aggregate([
            {
                $match: {
                    yoga_class_date: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: "$instructor_id",
                    instructor_name: { $first: "$instructor_name" },
                    classes_taught: { $sum: 1 },
                    students_attended: {
                        $sum: {
                            $size: {
                                $ifNull: ["$customers", []]
                            }
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "user",
                    localField: "_id",
                    foreignField: "user_id",
                    as: "instructor"
                }
            },
            {
                $unwind: "$instructor"
            },
            {
                $match: {
                    "instructor.role": "Instructor"
                }
            },
            {
                $addFields: {
                    payrate: {
                        $convert: {
                            input: "$instructor.payrate",
                            to: "decimal",
                            onError: { $toDecimal: "0" },
                            onNull: { $toDecimal: "0" }
                        }
                    }
                }
            },
            {
                $addFields: {
                    total_pay: {
                        $multiply: [
                            "$payrate",
                            { $toDecimal: "$students_attended" }
                        ]
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    instructor_id: "$_id",
                    instructor_name: 1,
                    classes_taught: 1,
                    students_attended: 1,
                    payrate: { $toString: "$payrate" },
                    total_pay: { $toString: "$total_pay" }
                }
            },
            {
                $sort: {
                    instructor_name: 1
                }
            }
        ]);

        res.json(results);

    }
    catch (error) {
        console.error("Error generating instructor pay report:", error);
        res.status(500).json({
            message: "Error generating instructor pay report"
        });
    }
});

module.exports = router;
