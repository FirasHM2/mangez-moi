var Breads = require('mongoose').model('Bread');

exports.breadsList = function(req, res) {
    Breads.find({}, (err, cats) => cats
    ).then((cats) => {
        Breads.find({}, (err, breads) => {
            res.render('admin-panel/details/breads', {active:'details', breads:breads, cats:cats});
        });
    });
}

exports.addBread = function(req, res) {
    let data = req.body.data;

    Breads.findOne({
        'name': data.name
    }, function(err, cat) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!cat) {
            bread = new Breads({
                category: data.categoryId,
                name: data.name,
                price: data.price
            });
            bread.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(bread._id);
            });
        }
    });
}

exports.updateBread = function(req, res) {
    let _id = req.body._id;
    let data = req.body.data;
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    Breads.updateOne({_id: _id}, {$set:data}, (err) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}
