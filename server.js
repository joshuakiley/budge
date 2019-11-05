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