const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

router.get("/new", (req, res) => {
    if (req.session.currentUser) {
        res.redirect("/")
    } else {
        res.render("users/new.ejs");
    }
});

router.post("/", (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        if (error) {
            res.send("its ded jim");
            console.log(error);
        } else {
            res.redirect("/payperiods");
            console.log(`User: ${createdUser.username}`);
        }
    });
});

module.exports = router;