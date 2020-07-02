var about = require('../controllers/about.controller');

module.exports = function (app) {
    app.route('/about')
        .get(about.render);
};