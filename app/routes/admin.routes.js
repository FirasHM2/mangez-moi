var admin = require('../controllers/admin.controller');
var requireAdmin = require('../middlewares/requireAdmin');

module.exports = function (app) {
    app.get('/admin-panel', requireAdmin, admin.render);

    app.get('/admin-panel/users', requireAdmin, admin.userList);
    app.post('/admin-panel/users/update', requireAdmin, admin.updateUser);
    app.post('/admin-panel/users/reset', requireAdmin, admin.resetPassword);

    app.get('/admin-panel/categories', requireAdmin, admin.categoryList);
    app.post('/admin-panel/categories/add', requireAdmin, admin.addCategory);
    app.post('/admin-panel/categories/update', requireAdmin, admin.updateCategory);
};
