var User = require('mongoose').model('User');
const passport = require('passport');

var user = require('./dummy.js');

exports.signin = function (req, res, next) {
    // if (!req.user) {
    //     res.send("signin part!");
    // }
    // else {
        const user = new User(req.body);
        req.login(user, function (err) {
            if (err) {
                console.log(err);
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/");
                });
            }
        });
    // }
}

exports.signup = function (req, res, next) {
    // if (!req.user) {
    //     res.send("signup part!");
    // }
    // else {
        console.log(req.body);
        User.register(req.body, req.body.password, function (err, user) {
            if (err) {
                console.log(err);
                res.send(err);
                // res.redirect("/")
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/");
                });
            }
        });
    // }
}

exports.renderProfile = function (req, res, next) {
    res.render("userProfile", { user: user });
}