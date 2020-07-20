var Drink = require('mongoose').model('Drink');

exports.getList = function(req, res) {
    Drink.find({}, function(err, items) {
        res.render('admin-panel/details/drinks', {active:'details', items:items});
    });
}
exports.add = function(req, res) {
    let data = req.body.data;

    Drink.findOne({
        'name': data.name
    }, function(err, sauce) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!sauce) {
            item = new Drink({
                name: data.name,
                price: data.price
            });
            item.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(item._id);
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
    Drink.updateOne({_id: _id}, {$set:data}, (err, item) => {
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
    Drink.findOneAndRemove({_id: _id}, (err, item) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}