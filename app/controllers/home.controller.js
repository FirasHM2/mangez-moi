var Product = require('mongoose').model('Product');

var sandCategory = "Sandwichs";

exports.index = function (req, res) {
    Product.find({}, function (err, result) {
        if (err) {
            res.send('error occured in Product Model.');
            return;
        }
        console.log(result);
        res.render("index", { sandwich: result, sandCategory: sandCategory });
    });
}