var Products = require('mongoose').model('Product');
var Cats = require('mongoose').model('Category');

exports.productList = function(req, res) {
    Cats.find({}, (err, cats) => cats)
    .then((cats) => {
        Products.find({}, (err, products) => {
            res.render('admin-panel/menu/products', {active:'menu', products:products, cats:cats});
        });
    });
}

exports.addProduct = function(req, res) {
    let data = req.body.data;
    Products.findOne({
        'category': data.category,
        'name': data.name
    }, function(err, product) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!product) {
            product = new Products({
                category: data.category,
                name: data.name,
                price: data.price,
                description: data.description,
            });
            product.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(product.id);
                return;
            });
        } else res.send("already_exist");
    });
}

exports.updateProduct = function(req, res) {
    let id = req.body.id;
    let data = req.body.data;
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
    Products.updateOne({id: id}, {$set:data}, (err) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}

exports.deleteProduct = function(req, res) {
    let id = req.body.id;
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
    Products.findOneAndRemove({id: id}, (err, product) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}
