const passport = require("passport");
var users = require('../controllers/user.controller');

module.exports = function (app) {

    app.route('/signin')
        .post(users.signin);

    app.route('signin/google')
        .get(users.signinWithGoogle);
        
    app.route('signin/facebook')
        .get(users.signinWithFacebook);

    app.route('/signup')
        .post(users.signup);

    app.route('/signout')
        .get(users.signout);

    app.route('/profile')
        .get(users.renderProfile);
};