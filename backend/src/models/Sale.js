const { Decimal128 } = require("mongodb");
const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
    {
        id: {
            type: Integer,
            required: true,
            unique: true,
        },
        customer_id: {
            type: String,
            required: true,
        },
        type: {
            type: array('Senior', 'General'),
            required: true,
        },

        number_of_classes: {
            type: array('1', '4', '10', 'Unlimited'),
            required: true
        },
        price_paid: {
            type: Decimal128(10,2),
            required: true
        },
        payment_method: {
            type: array('Visa', 'MasterCard', 'Discover', 'American Express'),
            required: true
        },
        start_date: {
            type: date - time,
            required: true
        },
        end_date: {
            type: date - time,
            required: true
        },
        sale_date_time: {
            type: date - time,
            required: true
        },
    }
);

module.exports = mongoose.model("Sale", saleSchema);
