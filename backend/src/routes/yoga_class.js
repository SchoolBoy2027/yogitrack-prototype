const express = require("express");
const router = express.Router();
const Yoga_Class = require("../models/Yoga_Class");

console.log("YOGA_CLASS ROUTES LOADED");

router.get("/", async (req, res) => {
    try {
        console.log("Finding yoga_classes....");
        const yoga_classes = await Yoga_Class.find();
        console.log("Yoga_Classes found:", yoga_classes.length);
        console.log("Yoga_Classes:", yoga_classes);
        res.json(yoga_classes);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
        console.error("Error finding yoga_classes:", error);
    }
});


router.get("/:id", async (req, res) => {
    try {
        const yoga_class = await Yoga_Class.findOne({
            yoga_class_id: req.params.id
        });

        if (!yoga_class) {
            return res.status(404).json({
                message: "Yoga_Class not found"
            });
        }

        res.json(yoga_class);

    } catch (error) {
        console.error("Error finding yoga_class:", error);

        res.status(500).json({
            message: error.message
        });
    }
});



// Generate a 5-character user ID based on role
async function generateClassId() {
    const year = new Date().getFullYear();

    const count = await Yoga_Class.countDocuments({
        yoga_class_id: {
            $gte: year * 10000000,
            $lt: (year + 1) * 10000000
        }
    });

    const yoga_class_id = year * 1000000 + count + 1;
    return await yoga_class_id;
}

router.post("/", async (req, res) => {
    try {
        const yoga_class = new Yoga_Class(req.body);

        const yoga_class_id = await generateClassId();
             yoga_class.yoga_class_id = yoga_class_id;
        const savedYoga_Class = await yoga_class.save();

        res.status(201).json(savedYoga_Class);
    } catch (error) {
        console.error("Error creating yoga_class:", error);

        res.status(400).json({
            message: error.message
        });
    }
});

router.put("/:yoga_class_id", async (req, res) => {
    try {
        console.log("Updating yoga_class:", req.params.yoga_class_id);
        console.log("New data:", req.body);

        const updatedYoga_Class = await Yoga_Class.findOneAndUpdate(
            { yoga_class_id: req.params.yoga_class_id },
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedYoga_Class) {
            return res.status(404).json({
                message: "Yoga_Class not found"
            });
        }

        res.json(updatedYoga_Class);

    } catch (error) {
        console.error("Error updating yoga_class:", error);

        res.status(500).json({
            message: error.message
        });
    }
});
router.delete("/:yoga_class_id", async (req, res) => {
    try {
        const deletedYoga_Class = await Yoga_Class.findOneAndDelete({
            yoga_class_id: req.params.yoga_class_id
        });

        if (!deletedYoga_Class) {
            return res.status(404).json({
                message: "Yoga_Class not found"
            });
        }

        res.json({
            message: "Yoga_Class deleted successfully",
            yoga_class: deletedYoga_Class
        });

    } catch (error) {
        console.error("Error deleting yoga_class:", error);

        res.status(500).json({
            message: error.message
        });
    }
});

/*
const instructors = [
    { id: "I0002", name: "Sarah Johnson" },
    { id: "I0003", name: "David Martinez" },
    { id: "I0004", name: "Jennifer Williams" }
];

const startTimes = ["05:00", "10:00", "15:00", "20:00"];
const classes = [];
let classNumber = 5;

for (let day = 1; day <= 31; day++) {
    const dateString = `2026-10-${String(day).padStart(2, "0")}`;

    for (const time of startTimes) {
        const instructor = instructors[(classNumber - 5) % instructors.length];
        const start = new Date(`${dateString}T${time}:00-05:00`);
        const end = new Date(start.getTime() + 60 * 60 * 1000);

        classes.push({
            yoga_class_id: `2026${String(classNumber).padStart(6, "0")}`,
            yoga_class_type: "General",
            yoga_class_date: new Date(`${dateString}T00:00:00.000Z`),
            instructor_id: instructor.id,
            instructor_name: instructor.name,
            start_time: start,
            end_time: end,
            __v: 0
        });

        classNumber++;
    }
}

db.yoga_classes.insertMany(classes);
*/

module.exports = router;