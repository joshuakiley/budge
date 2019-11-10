const express = require("express");
const router = express.Router();
const PayPeriod = require("../models/payperiods.js");
const Transaction = require("../public/js/transaction.js");

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

router.get("/:id", (req, res) => {
    if (req.session.currentUser) {
        PayPeriod.find({
            user: req.session.currentUser
        }, (error, allPayPeriods) => {
            PayPeriod.findById(req.params.id, (error, foundPayPeriod) => {
                res.render("budgets/payperiods/show.ejs", {
                    user: req.session.currentUser,
                    payperiod: foundPayPeriod,
                    payperiods: allPayPeriods,
                    items: foundPayPeriod.item
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
        PayPeriod.find({
            user: req.session.currentUser
        }, (error, allPayPeriods) => {
            if (error) {
                res.send("its ded jim");
                console.log(error);
            } else {
                PayPeriod.findById(req.params.id, (error, foundPayPeriod) => {
                    if (error) {
                        res.send("its ded jim");
                        console.log(error);
                    } else {
                        res.render("budgets/items/edit.ejs", {
                            user: req.session.currentUser,
                            payperiod: foundPayPeriod,
                            payperiods: allPayPeriods
                        });
                    }
                });
            }
        });
    }
});

router.post("/", (req, res) => {
    if (req.session.currentUser) {
        req.body.user = req.session.currentUser;
        const start = new Date(req.body.startDate);
        const end = new Date(req.body.endDate);
        if (start.getMonth() === end.getMonth()) {
            req.body.days = end.getDate() - start.getDate() + 1;
        } else if (start.getMonth() < end.getMonth()) {
            const monthOneEnd = new Date(start.getFullYear(), start.getMonth() + 1, 0);
            req.body.days = (monthOneEnd.getDate() - start.getDate() + 1) + end.getDate();
        }

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

router.put("/:id", (req, res) => {
    if (req.session.currentUser) {
        PayPeriod.findById(req.params.id, (error, foundPayPeriod) => {
            if (error) {
                res.send("its ded jim");
                console.log(error);
            } else {
                const newItemArr = [];
                const newTransaction = new Transaction(new Date(req.body.date), parseFloat(req.body.amount), req.body.note);
                foundPayPeriod.item.forEach(el => {
                    newItemArr.push(el);
                });
                newItemArr.push(newTransaction);
                // req.body.user = foundPayPeriod.user
                // req.body.days = foundPayPeriod.days;
                // req.body.startDate = foundPayPeriod.startDate;
                // req.body.endDate = foundPayPeriod.endDate;
                // req.body.item = newItemArr;
                PayPeriod.findByIdAndUpdate(req.params.id, req.body, {
                    new: true
                }, (error, updatedPayPeriod) => {
                    if (error) {
                        res.send("its ded jim");
                        console.log(error);
                    } else {
                        res.redirect(`${req.params.id}`);
                    }
                });
            }
        })

    } else {
        res.redirect("/");
    }
});

router.delete("/:id", (req, res) => {
    PayPeriod.findByIdAndRemove(req.params.id, (error, deletedPayPeriod) => {
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