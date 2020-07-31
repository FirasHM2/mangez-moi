var meats = require('mongoose').model('Meat');
var Cats = require('mongoose').model('Category');

exports.meatsList = function(req, res) {
    Cats.find({}, (err, cats) => cats)
    .then((cats) => {
        if (cats.length == 0) {
            res.redirect('/admin-panel/goToCategory');
        }
        meats.find({}, (err, meats) => {
            res.render('admin-panel/details/meats', {active:'details', meats:meats, cats:cats});
        });
    });
}

exports.addMeat = function(req, res) {
    let data = req.body.data;
    console.log("data", data);
    meats.findOne({
        'category': data.category,
        'name': data.name
    }, function(err, meat) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!meat) {
            meat = new meats({
                category: data.category,
                name: data.name,
                price: data.price
            });
            meat.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(meat._id);
                return;
            });
        } else res.send("already_exist");
    });
}

exports.updateMeat = function(req, res) {
    let _id = req.body._id;
    let data = req.body.data;
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    meats.updateOne({_id: _id}, {$set:data}, (err) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}

exports.deleteMeat = function(req, res) {
    let _id = req.body._id;
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    meats.findOneAndRemove({_id: _id}, (err, meat) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}
