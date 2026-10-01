const mongoose = require("mongoose");

const yogaClassSchema = new mongoose.Schema(
  {

    id: {
      type: Integer,
      required: true,
      unique: true
    },

    class_type: {
      type: String,
      required: true,
    },
    class_date: {
      type: date,
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
      type: Time,
      required: true,
    },
    end_time: {
      type: Time,
      required: true,
    },
  },
);

module.exports = mongoose.model("User", yogaClassSchema);
