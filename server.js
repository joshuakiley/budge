//==============================
//    DEPENDENCIES
//==============================
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();

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
    console.log("mongo bongo time!");
});

//==============================
//    CONTROLLER SETUP
//==============================
const usersController = require("./controllers/users.js");
const sessionsController = require("./controllers/sessions.js");

//==============================
//    MIDDLEWARE
//==============================
app.use(express.static(__dirname, "/public"));
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

//==============================
//    GET INDEX
//==============================
app.get("/", (req, res) => {
    res.render("index.ejs", {
        currentUser: req.sessions.currentUser
    });
});

app.get("/home", (req, res) => {
    if (req.session.currentUser) {
        res.render("/sessions/home.ejs");
    } else {
        res.redirect("/index.ejs");
    }
});