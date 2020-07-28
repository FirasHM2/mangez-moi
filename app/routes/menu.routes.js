var menu = require('../controllers/menu.controller');
var requireAdmin = require('../middlewares/requireAdmin');
var requireAuth = require('../middlewares/requireAuth');

module.exports = function (app) {
    app.get('/menu', menu.render);

    app.post('/menu/popupDetails/:cid/:pid', requireAuth, menu.popupDetails);
    app.post('/menu/getOrderPrice', requireAuth, menu.getOrderPrice);
    app.post('/menu/addOrder', requireAuth, menu.addOrder);
    app.post('/menu/getCartedCount', requireAuth, menu.getCartedCount);
};