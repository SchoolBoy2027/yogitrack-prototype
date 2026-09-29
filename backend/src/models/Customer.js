 mongoose = require('mongoose');

const customerSchema= mongoose.Schema({
    id: {
      type: String,
      required: true,
      unique:true
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
      type: array('Phone','Email'),
      required: true
    },
    fname: {
      type: String,
      required: true
    },
    
    balance:{
      type:Integer,
      required:true 
    }
    
  });

module.exports = mongoose.model('Customer', customerSchema);