const express = require("express");
const router = express.Router();
const Item = require("../models/items.js")

router.get("/", (req, res) => {
    if (req.session.currentUser) {
        Item.find({}, (error, allItems) => {
            if (error) {
                res.send("its ded jim");
            } else {
                res.render("budgets/items/show.ejs")
            }
        });
    }
});

module.exports = router;