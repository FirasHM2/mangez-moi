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
    app.post('/admin-panel/categories/delete', requireAdmin, admin.deleteCategory);

    app.get('/admin-panel/breads', requireAdmin, admin.breadsList);
    app.post('/admin-panel/breads/add', requireAdmin, admin.addBread);
    app.post('/admin-panel/breads/update', requireAdmin, admin.updateBread);

    app.get('/admin-panel/ingredients', requireAdmin, admin.ingredientsList);
    app.post('/admin-panel/ingredients/add', requireAdmin, admin.addIngredient);
    app.post('/admin-panel/ingredients/update', requireAdmin, admin.updateIngredient);
};
