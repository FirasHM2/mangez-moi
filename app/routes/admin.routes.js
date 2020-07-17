var users = require('../controllers/admin-panel/users.controller');
var sauces = require('../controllers/admin-panel/sauces.controller');
var supplements = require('../controllers/admin-panel/supplements.controller');
var desserts = require('../controllers/admin-panel/desserts.controller');
var cats = require('../controllers/admin-panel/categories.controller');
var breads = require('../controllers/admin-panel/breads.controller');
var ingredients = require('../controllers/admin-panel/ingredients.controller');
var requireAdmin = require('../middlewares/requireAdmin');

module.exports = function (app) {
    app.get('/admin-panel', requireAdmin, users.render);

    app.get('/admin-panel/users', requireAdmin, users.userList);
    app.post('/admin-panel/users/update', requireAdmin, users.updateUser);
    app.post('/admin-panel/users/reset', requireAdmin, users.resetPassword);

    app.get('/admin-panel/categories', requireAdmin, cats.categoryList);
    app.post('/admin-panel/categories/add', requireAdmin, cats.addCategory);
    app.post('/admin-panel/categories/update', requireAdmin, cats.updateCategory);
    app.post('/admin-panel/categories/delete', requireAdmin, cats.deleteCategory);

    app.get('/admin-panel/breads', requireAdmin, breads.breadsList);
    app.post('/admin-panel/breads/add', requireAdmin, breads.addBread);
    app.post('/admin-panel/breads/update', requireAdmin, breads.updateBread);

    app.get('/admin-panel/ingredients', requireAdmin, ingredients.ingredientsList);
    app.post('/admin-panel/ingredients/add', requireAdmin, ingredients.addIngredient);
    app.post('/admin-panel/ingredients/update', requireAdmin, ingredients.updateIngredient);

    app.get('/admin-panel/sauces', requireAdmin, sauces.getList);
    app.post('/admin-panel/sauces/add', requireAdmin, sauces.add);
    app.post('/admin-panel/sauces/update', requireAdmin, sauces.update);
    app.post('/admin-panel/sauces/delete', requireAdmin, sauces.delete);

    app.get('/admin-panel/supplements', requireAdmin, supplements.getList);
    app.post('/admin-panel/supplements/add', requireAdmin, supplements.add);
    app.post('/admin-panel/supplements/update', requireAdmin, supplements.update);
    app.post('/admin-panel/supplements/delete', requireAdmin, supplements.delete);

    app.get('/admin-panel/desserts', requireAdmin, desserts.getList);
    app.post('/admin-panel/desserts/add', requireAdmin, desserts.add);
    app.post('/admin-panel/desserts/update', requireAdmin, desserts.update);
    app.post('/admin-panel/desserts/delete', requireAdmin, desserts.delete);
};
