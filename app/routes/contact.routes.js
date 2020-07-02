var contact = require('../controllers/contact.controller');

module.exports = function (app) {
    app.route('/contact')
        .get(contact.render);
};