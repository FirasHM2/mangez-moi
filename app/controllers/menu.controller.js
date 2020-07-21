var Products = require('mongoose').model('Product');
let Cats = require('mongoose').model('Category');

exports.render = function (req, res) {
    let data = [];
    console.log('asdfasdfasdf');
    Cats.find({}).then((cats) => {
        var tasks = cats.map((cat) => {
            console.log('cat', cat);
            var categoryData = cat;
            return Products.find({category : cat.id}, (err, products) => {
                categoryData.products = products;
                data.push(categoryData);
            });
        });
        Promise.all(tasks).then(() => {
            res.render('menuPage', {data : data});
        });
    });
}