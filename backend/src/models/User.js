const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique:true
    },
    role:{
      type:String,
      required:true 
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
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: false
    },    
});

module.exports = mongoose.model("User", userSchema, "user");
