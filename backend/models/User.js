const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique:true
    },
    role:{
      type:String //array('Manager,Instructor'),
    },
    fname: {
      type: String,
      required: true
    },
    lname: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zip: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    communication_preference: {
      type: String, //array('Phone','Email'),
      required: true
    },
    password: {
      type: String,
      required: false
    },
    
});

module.exports = mongoose.model("User", userSchema);
