const express = require("express");
const router = express.Router();
const PayPeriod = require("../models/payperiods.js");

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

router.get("/new", (req, res) => {
    res.render("budgets/payperiods/new.ejs", {
        user: req.session.currentUser
    });
});

router.get("/:id", (req, res) => {
    PayPeriod.findById(req.params.id, (error, foundPayPeriod) => {
        res.render("budgets/payperiods/show.ejs", {
            user: req.session.currentUser,
            payperiod: foundPayPeriod
        });
        console.log(foundPayPeriod);
    });
});

router.get("/:id/edit", (req, res) => {
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
});

router.post("/", (req, res) => {
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