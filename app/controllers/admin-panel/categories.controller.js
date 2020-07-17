var Cats = require('mongoose').model('Category');

exports.categoryList = function(req, res) {
    Cats.find({}, function(err, cats) {
        res.render('admin-panel/menu/categories', {active:'menu', cats:cats});
    });
}
exports.addCategory = function(req, res) {
    let data = req.body.data;

    Cats.findOne({
        'name': data.name
    }, function(err, cat) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!cat) {
            cat = new Cats({
                name: data.name,
                detail: data.detail
            });
            cat.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(cat._id);
                return;
            });
        } else res.send("already_exist");
    });
}

exports.updateCategory = function(req, res) {
    let _id = req.body._id;
    let data = req.body.data;
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    Cats.updateOne({_id: _id}, {$set:data}, (err, cat) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}
exports.deleteCategory = function(req, res) {
    let _id = req.body._id;
    console.log("_id: ", _id);
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    Cats.findOneAndRemove({_id: _id}, (err, cat) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}