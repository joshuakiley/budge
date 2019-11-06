const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const Item = require("../models/items.js");

router.get("/new", (req, res) => {
    res.render("budgets/newbudget.ejs")
})

router.post("/", (req, res) => {
    Item.create(req.body, (error, createdItem) => {
        if (error) {
            res.send("its ded jim");
            console.log(error);
        } else {
            res.redirect("/home");
        }
    });
});

module.exports = router;