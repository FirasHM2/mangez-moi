var users = require('../controllers/user.controller');

module.exports = function (app) {

    app.route('/signin')
        .post(users.signin);

    app.route('/signup')
        .post(users.signup);

    app.route('/profile')
        .get(users.renderProfile);
};