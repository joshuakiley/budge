//==============================
//    DEPENDENCIES
//==============================
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./models/users.js");
const PayPeriod = require("./models/payperiods.js");
const Item = require("./models/items.js");
const PORT = 3000;

//==============================
//    DATABASE SETUP
//==============================
mongoose.connect("mongodb://localhost:27017/budge", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.once("open", () => {
    console.log("Mongo: budge database online");
});

//==============================
//    CONTROLLER SETUP
//==============================
const usersController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");
const payPeriodsController = require("./controllers/payperiods.js")
const itemsController = require("./controllers/items.js")

//==============================
//    MIDDLEWARE
//==============================
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(express.urlencoded({
    extended: false
}));
app.use(session({
    secret: "DSF3o23eldSDdkas2120sdk",
    resave: false,
    saveUninitialized: false
}));
app.use("/users", usersController);
app.use("/sessions", sessionsController);
app.use("/payperiods", payPeriodsController);
app.use("/items", itemsController);

//==============================
//    GET INDEX
//==============================
app.get("/", (req, res) => {
    if (req.session.currentUser !== undefined) {
        res.redirect("/payperiods")
    } else {
        res.render("index.ejs");
    }
});

app.listen(PORT, () => {
    console.log("Express: port éisteachta...");
});