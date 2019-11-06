const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");

router.post("/", (req, res) => {
    User.findOne({
        username: req.body.username
    }, (error, foundUser) => {
        if (bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.currentUser = foundUser;
            res.redirect("/home");
        } else {
            res.send("wrong password");
            console.log(error);
        }
    });
});

router.delete("/", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

module.exports = router;