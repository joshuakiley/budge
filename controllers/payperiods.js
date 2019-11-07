const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/users.js");
const Item = require("../models/items.js");

router.get("/new", (req, res) => {
    res.render("budgets/newbudget.ejs", {
        user: req.session.currentUser
    });
});

router.get("/:id", (req, res) => {
    Item.findById(req.params.id, (error, foundItem) => {
        res.render("budgets/show.ejs", {
            user: req.session.currentUser,
            item: foundItem
        });
        console.log(foundItem)
    });
});

router.get("/:id/edit", (req, res) => {
    Item.findById(req.params.id, (error, foundItem) => {
        if (error) {
            res.send("its ded jim");
            console.log(error);
        } else {
            res.render("edit.ejs", {
                item: foundItem
            });
        }
    });
});

router.post("/", (req, res) => {
    req.body.user = req.session.currentUser
    Item.create(req.body, (error, createdItem) => {
        if (error) {
            res.send("its ded jim");
            console.log(error);
        } else {
            res.redirect("/home");
            console.log(createdItem);
        }
    });
});

router.delete("/budgets/:id", (req, res) => {
    Item.findByIdAndRemove(req.params.id, (error, deletedFruit) => {
        if (error) {
            res.send("its ded jim");
            console.log(error);
        } else {
            res.redirect("/home");
        }
    });
});

module.exports = router;