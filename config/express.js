const express = require("express");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require("passport");
const ejs = require("ejs");
const session = require('express-session');
const config = require('./dev.env');

module.exports = function () {

    var app = express();
    require('./passport');

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    app.use(session({
        secret: config.secret,
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.set('views', './views');
    app.set('view engine', 'ejs');

    require("../app/routes")(app);

    app.use(express.static("./public"));

    return app;
};