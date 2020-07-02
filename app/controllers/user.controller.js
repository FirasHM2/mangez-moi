var User = require('mongoose').model('User');

var user = require('./dummy.js');

exports.signin = function(req, res, next) {
    if (!req.user) {
        res.send("signin part!");
    }
    else {
        return res.redirect('/');
    }
}

exports.signup = function(req, res, next) {
    if (!req.user) {
        res.send("signup part!");
    }
    else {
        return res.redirect('/');
    }
}

exports.renderProfile = function(req, res, next) {
    res.render("userProfile", {user: user});  
}