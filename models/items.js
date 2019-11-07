const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    payperiod: String,
    date: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    note: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;