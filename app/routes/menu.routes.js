var menu = require('../controllers/menu.controller');
var requireAdmin = require('../middlewares/requireAdmin');
var requireAuth = require('../middlewares/requireAuth');

module.exports = function (app) {
    app.get('/menu', menu.render);
};