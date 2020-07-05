var Product = require('mongoose').model('Product');

var sandCategory = "Sandwichs";

exports.render = function (req, res) {
    Product.find({}, function (err, result) {
        if (err) {
            res.send('error occured in Product Model.');
            return;
        }
        res.render("menuPage", { sandwich: result, sandCategory: sandCategory });
    });
}