var User = require('mongoose').model('User');
const passport = require('passport');

exports.signin = function (req, res, next) {
    if (!req.user) {
        const user = new User(req.body);
        req.login(user, function (err) {
            if (err) {
                Console.log(err);
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/");
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
}

exports.signinWithGoogle = function(req, res, next) {
    passport.authenticate("google", { scope: ["profile"] });
}
exports.signinWithFacebook = function(req, res, next) {
    passport.authenticate("facebook");
}

exports.signup = function (req, res, next) {
    if (!req.user) {
        User.register({ name: req.body.name, email: req.body.email }, req.body.password, function (err, user) {
            if (err) {
                res.locals.errMsg = err;
                res.render('index');
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/");
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
}

exports.signout = function (req, res) {
    req.logout();
    res.redirect("/");
}

exports.renderProfile = function (req, res, next) {
    res.render("userProfile", { });
}