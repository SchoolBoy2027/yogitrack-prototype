mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
  customer_id: {
    type: String,
    required: true,
    unique: true
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
  email: {
    type: String,
    required: true
  },
  communication_preference: {
    type: String,
    required: true
  },
  customer_type: {
    type: String,
    required: true
  },

  balance: {
    type: Number,
    default: 0,
    required: false
  },

  start_date: {
    type: Date,
    required: false
  },
  end_date: {
    type: Date,
    required: false
  },
    yoga_class_type: {
    type: String,
    required: false
  },
  packages_purchased: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class_Package"
  }],

});

module.exports = mongoose.model('Customer', customerSchema, "customer");