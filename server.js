//==============================
//    DEPENDENCIES
//==============================
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const methodOverride = require("method-override");
const app = express();
const bcrypt = require("bcrypt");
const User = require("./models/users.js")
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

//==============================
//    GET INDEX
//==============================
app.get("/", (req, res) => {
    if (req.session.currentUser !== undefined) {
        res.redirect("/home")
    } else {
        res.render("index.ejs");
    }
});

app.get("/home", (req, res) => {
    if (req.session.currentUser) {
        res.render("sessions/home.ejs");
        console.log("logged in")
    } else {
        res.redirect("/");
    }
});

const date = new Date(1980, 1, 31);
const date2 = new Date(date).getDate() + 1;

console.log(date)
console.log(date2)

app.listen(PORT, () => {
    console.log("port éisteachta...");
});