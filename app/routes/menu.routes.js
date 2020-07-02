var menu = require('../controllers/menu.controller');

module.exports = function (app) {
    app.route('/menu')
        .get(menu.render);
};