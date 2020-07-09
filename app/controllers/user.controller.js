var User = require('mongoose').model('User');
const passport = require('passport');

exports.signin = function (req, res, next) {
    console.log('req.user', req.user);
    if (!req.user) {
        const user = new User(req.body);
        req.login(user, function (err) {
            if (err) {
                console.log("error msg: ", err);
            } else {
                passport.authenticate("local",
                    {
                        failureRedirect: '/signinFailure',
                        failureFlash: true
                    }
                )(req, res, function () {
                    res.send('success');
                });
            }
        });
    }
    else {
        res.redirect('/');
    }
}

exports.signinFailure = function (req, res) {
    res.send(req.flash('error'));
}

exports.signinWithGoogle = function (req, res, next) {
    passport.authenticate("google", { scope: ["profile"] });
}
exports.signinWithFacebook = function (req, res, next) {
    passport.authenticate("facebook");
}

exports.signup = function (req, res, next) {
    if (!req.user) {
        User.register({ name: req.body.name, email: req.body.email }, req.body.password, function (err, user) {
            if (err) {
                res.json(err);
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.send('success');
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
    res.render("userProfile", {});
}