var admin = require('../controllers/admin.controller');
var requireAdmin = require('../middlewares/requireAdmin');

module.exports = function (app) {
    app.get('/admin-panel', requireAdmin, admin.render);

    app.get('/admin-panel/users', requireAdmin, admin.users);

    app.post('/admin-panel/users/update', requireAdmin, admin.update);
    app.post('/admin-panel/users/reset', requireAdmin, admin.reset);
};
