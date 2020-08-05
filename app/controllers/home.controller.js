let Constants = require('../../config/constants');
var Slides = require('mongoose').model('Slide');

exports.slideList = function(req, res) {
    Slides.find({}, (err, slides) => {
        res.render('index', {slides:slides});
     });
}