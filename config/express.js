const express = require("express");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejs = require("ejs");

module.exports = function () {

    var app = express();
    
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    app.set('views', './views');
    app.set('view engine', 'ejs');

    require("../app/routes")(app);

    app.use(express.static("./public"));

    return app;
};