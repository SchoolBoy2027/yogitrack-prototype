const mongoose = require("mongoose");

const yogaClassSchema = new mongoose.Schema(
  {

    id: {
      type: Integer,
      required: true,
      unique: true
    },

    type: {
      class_type: String,
      required: true,
    },
    class_date: {
      type: date,
      required: true,
    },
    instructor_id: {
      type: string,
      required: true,
    },
    instructor_name: {
      type: string,
      required: false,
    },
    
    start_time: {
      type: time,
      required: true,
    },
    end_time: {
      type: time,
      required: true,
    },
  },
);

module.exports = mongoose.model("User", yogaClassSchema);
