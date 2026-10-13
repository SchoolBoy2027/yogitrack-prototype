const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true
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
      type: String,
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
    mustChangePassword: {
      type: Boolean,
      default: true
    },
    payrate: {
      type: mongoose.Schema.Types.Decimal128,
      default: 10.00,
    }

  });

module.exports = mongoose.model("User", userSchema, "user");
