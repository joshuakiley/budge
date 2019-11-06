const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    date: {
        type: Number,
        required: true
    },

    // on = true = income or off = false = expense
    type: {
        type: Boolean,
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
})

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;