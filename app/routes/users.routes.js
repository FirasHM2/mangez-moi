const passport = require("passport");
var users = require('../controllers/user.controller');
var requireAuth = require('../middlewares/requireAuth');
var requireAdmin = require('../middlewares/requireAdmin');

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

    app.route('/users')
        .get(users.renderUsers);
};