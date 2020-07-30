var cart = require('../controllers/cart.controller');

module.exports = function (app) {
    app.route('/cart')
        .get(cart.render);
};