const passport = require("passport");
const express = require('express');
var users = require('../controllers/user.controller');
var requireAuth = require('../middlewares/requireAuth');

module.exports = function (app) {

    app.route('/signin')
        .post(users.signin);
    app.route('/signinFailure')
        .get(users.signinFailure);

    app.route('/signin/google')
        .get(users.signinWithGoogle);
        
    app.route('/signin/facebook')
        .get(users.signinWithFacebook);

    app.route('/signup')
        .post(users.signup);

    app.route('/signout')
        .get(users.signout);

    app.get('/profile', requireAuth, users.renderProfile);
};