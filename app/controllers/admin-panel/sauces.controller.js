var Sauces = require('mongoose').model('Sauce');

exports.getList = function(req, res) {
    Sauces.find({}, function(err, sauces) {
        res.render('admin-panel/details/sauces', {active:'details', sauces:sauces});
    });
}
exports.add = function(req, res) {
    let data = req.body.data;

    Sauces.findOne({
        'name': data.name
    }, function(err, sauce) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!sauce) {
            sauce = new Sauces({
                name: data.name,
                price: data.price
            });
            sauce.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(sauce._id);
                return;
            });
        } else res.send("already_exist");
    });
}

exports.update = function(req, res) {
    let _id = req.body._id;
    let data = req.body.data;
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    Sauces.updateOne({_id: _id}, {$set:data}, (err, cat) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}

exports.delete = function(req, res) {
    let _id = req.body._id;
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    Sauces.findOneAndRemove({_id: _id}, (err, sauce) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}