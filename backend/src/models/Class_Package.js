//const { Decimal128, Int32, Timestamp, Long } =
// require("mongodb");
const mongoose = require("mongoose");

const classPackageSchema = new mongoose.Schema(
    {
        class_package_id: {
            type: String,
            required: true,
            unique: true,
        },
        package_category: {
            type: String,
            required: true,
        },

        class_type: {
            type: String,
            required: true,
        },

        number_of_classes: {
            type: mongoose.Schema.Types.Int32,
            required: true
        },
        cost: {
            type: mongoose.Schema.Types.Decimal128,
            required: true
        },
        days: {
            type: mongoose.Schema.Types.Int32,
            required: true
        },
        is_active: {
            type: mongoose.Schema.Types.Boolean,
            required: true,
            default: true
        },

    }
);

module.exports = mongoose.model("Class_Package", classPackageSchema, "class_package");
