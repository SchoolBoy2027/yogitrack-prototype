const mongoose = require("mongoose");

const yogaClassSchema = new mongoose.Schema(
  {

    yoga_class_id: {
      type: String,
      required: true,
      unique: true
    },

    yoga_class_type: {
      type: String,
      required: true,
    },
    yoga_class_date: {
      type: Date,
      required: true,
    },
    instructor_id: {
      type: String,
      required: true,
    },
    instructor_name: {
      type: String,
      required: false,
    },
    
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
  },
);

module.exports = mongoose.model("Yoga_Class", yogaClassSchema,"yoga_class");
