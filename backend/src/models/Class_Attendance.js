const classAttendanceSchema = new mongoose.Schema({
    yoga_class_id: {
        type: String,
        required: true,
        unique: true
    },
    yoga_class_type: {
        type: String,
        required: true
    },
    yoga_class_date: {
        type: Date,
        required: true
    },
    instructor_id: {
        type: String,
        required: true
    },
    instructor_name: {
        type: String
    },
    start_time: {
        type: Date,
        required: true
    },
    end_time: {
        type: Date,
        required: true
    },
    customers: [{
        _id: false,
        customer_id: {
            type: String,
            required: true
        },
        fname: {
            type: String,
            required: true
        },
        last_name: {
            type: String,
            required: true
        },
        balance: {
            type: Number,
            required: true
        }
    }]
});
module.exports = mongoose.model(
    "Class_Attendance",
    classAttendanceSchema,
    "class_attendance"
);