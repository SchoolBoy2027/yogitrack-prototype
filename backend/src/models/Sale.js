//const { Decimal128, Int32, Timestamp, Long } =
// require("mongodb");
const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
    {
        sale_id: {
            type: Number,
            required: true,
            unique: true,
        },

        customer_id: {
            type: String,
            required: true,
        },
        
        class_package_id: {
            type: String,
            required: true,
        },
        yoga_class_type: {
            type: String,
            required: false,
        },
        number_of_classes: {
            type: mongoose.Schema.Types.Int32,
            required: true
        },

        price_paid: {
            type: mongoose.Schema.Types.Decimal128,
            required: true
        },
        payment_method: {
            type: String,   //array('Visa', 'MasterCard', 'Discover', 'American Express'),
            required: true
        },
        start_date: {
            type: Date,
            required: true
        },
        end_date: {
            type: Date,
            required: true
        },
        sale_date_time: {
            type: Date,
            required: true
        },
    }
);

module.exports = mongoose.model("Sale", saleSchema,"sale");
