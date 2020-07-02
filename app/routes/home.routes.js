var home = require('../controllers/home.controller');

module.exports = function (app) {
    app.route('/')
        .get(home.render);
};