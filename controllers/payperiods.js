const express = require("express");
const router = express.Router();
const PayPeriod = require("../models/payperiods.js");
const Item = require("../models/items.js")

router.get("/", (req, res) => {
    if (req.session.currentUser) {
        PayPeriod.find({
            user: req.session.currentUser
        }, (error, allPayPeriods) => {
            if (error) {
                res.send("its ded jim");
            } else {
                res.render("budgets/payperiods/home.ejs", {
                    user: req.session.currentUser,
                    payperiods: allPayPeriods
                });
            }
        });
    } else {
        res.redirect("/");
    }
});

// NEW PAYPERIOD
router.get("/new", (req, res) => {
    if (req.session.currentUser) {
        PayPeriod.find({
            user: req.session.currentUser
        }, (error, allPayPeriods) => {
            if (error) {
                res.send("its ded jim");
                console.log(error);
            } else {
                res.render("budgets/payperiods/new.ejs", {
                    user: req.session.currentUser,
                    payperiods: allPayPeriods
                });
            }
        });
    } else {
        res.redirect("/");
    }
});

// NEW ITEM IN PAYPERIOD
router.get("/:id/items/new", (req, res) => {
    if (req.session.currentUser) {
        PayPeriod.find({
            user: req.session.currentUser
        }, (error, allPayPeriods) => {
            PayPeriod.findById(req.params.id, (error, foundPayPeriod) => {
                if (error) {
                    res.send("its ded jim");
                    console.log(error);
                } else {
                    res.render("budgets/items/new.ejs", {
                        user: req.session.currentUser,
                        payperiod: foundPayPeriod,
                        payperiods: allPayPeriods
                    });
                }
            });
        });
    } else {
        res.redirect("/");
    }
});

router.get("/:id", (req, res) => {
    if (req.session.currentUser) {
        PayPeriod.find({
            user: req.session.currentUser
        }, (error, allPayPeriods) => {
            PayPeriod.findById(req.params.id, (error, foundPayPeriod) => {
                res.render("budgets/payperiods/show.ejs", {
                    user: req.session.currentUser,
                    payperiod: foundPayPeriod,
                    payperiods: allPayPeriods
                });
                console.log(foundPayPeriod);
            });
        });
    } else {
        res.redirect("/");
    }
});

router.get("/:id/edit", (req, res) => {
    if (req.session.currentUser) {
        PayPeriod.findById(req.params.id, (error, foundPayPeriod) => {
            if (error) {
                res.send("its ded jim");
                console.log(error);
            } else {
                res.render("budgets/payperiods/edit.ejs", {
                    item: foundPayPeriod
                });
            }
        });
    } else {
        res.redirect("/");
    }
});

router.post("/", (req, res) => {
    if (req.session.currentUser) {
        req.body.user = req.session.currentUser
        const start = new Date(req.body.startDate);
        const end = new Date(req.body.endDate);
        req.body.days = ((end - start) / (1000 * 3600 * 24));
        console.log(((req.body.endDate - req.body.startDate) / (1000 * 3600 * 24)));
        PayPeriod.create(req.body, (error, createdPayPeriod) => {
            if (error) {
                res.send("its ded jim");
                console.log(error);
            } else {
                res.redirect("/");
                console.log(createdPayPeriod);
            }
        });
    } else {
        res.redirect("/");
    }
});

router.delete("/:id", (req, res) => {
    Item.findByIdAndRemove(req.params.id, (error, deletedPayPeriod) => {
        if (error) {
            res.send("its ded jim");
            console.log(error);
        } else {
            res.redirect("/");
            console.log(deletedPayPeriod);
        }
    });
});

module.exports = router;