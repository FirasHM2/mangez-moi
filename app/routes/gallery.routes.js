var gallery = require('../controllers/gallery.controller');

module.exports = function (app) {
    app.route('/gallery')
        .get(gallery.render);
};