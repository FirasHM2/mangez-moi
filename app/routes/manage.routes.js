var manage = require('../controllers/manage.controller');

module.exports = function (app) {
    app.route('/users')
        .get(manage.render);
};
