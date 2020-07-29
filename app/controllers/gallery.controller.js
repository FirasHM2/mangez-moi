var Gallerys = require('mongoose').model('Gallery');

exports.gallerytList = function(req, res) {
    Gallerys.find({}, (err, gallerys) => {
        res.render('gallery', {gallerys:gallerys});
    });
}