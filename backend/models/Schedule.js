const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    id: {
      type: Integer,
      required: true,
      unique:true
    },

    start_date: {
      type: date,
      required: true,
      unique: true
    },

    end_date: {
      type: date,
      required: true,
      unique:true
    }
  }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
