const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    username: String,
    password: String,
    days: {
        type: Number,
        required: true
    },
    expenses: [{
        type: Number
    }],
    income: [{
        type: Number
    }],
    note: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;