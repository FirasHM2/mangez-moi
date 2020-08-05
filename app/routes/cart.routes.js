let cart = require('../controllers/cart.controller');
let requireAuth = require('../middlewares/requireAuth');
let requireAdmin = require('../middlewares/requireAdmin');

module.exports = function (app) {
    app.route('/cart')
        .get(cart.render);
    app.post('/cart/delete', requireAuth, cart.delete);

    app.post('/pay', (req, res) => {res.json('success')});
};