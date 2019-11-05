const express = require("express");
const router = express.Router();
const User = require("../models/users.js");
bcrypt = require("bcrypt");

router.get("/new", (req, res) => {
    res.render("sessions/login.ejs");
});

router.post("/", (req, res) => {
    User.findOne({
        username: req.body.username
    }, (error, foundUser) => {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.sessions.currentUser = foundUser;
            res.redirect("/");
        } else {
            res.send("wrong password");
        }
    });
});

router.delete("/", (req, res) => {
    req.sessions.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;