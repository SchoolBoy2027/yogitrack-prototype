const classAttendanceSchema = new mongoose.Schema({

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
    instructor_id:{
        type:String,
      required: true,
    },
    customers_array:{ 
        type:[String],
      required: false,
     },
    
    customers_id_array:{ 
        type:[String],
        required:false,
    }
});

module.exports = mongoose.model("Class_Attendance", classAttendanceSchema
    , "class_attendance");
