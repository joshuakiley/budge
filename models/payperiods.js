const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const payPeriodSchema = new Schema({
    user: String,
    days: {
        type: Number,
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    item: []

}, {
    timestamps: true
});

const PayPeriod = mongoose.model("PayPeriod", payPeriodSchema);

module.exports = PayPeriod;