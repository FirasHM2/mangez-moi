var Breads = require('mongoose').model('Bread');
var Cats = require('mongoose').model('Category');

exports.breadsList = function(req, res) {
    Cats.find({}, (err, cats) => cats)
    .then((cats) => {
        if (cats.length == 0) {
            res.redirect('/admin-panel/goToCategory');
        }
        Breads.find({}, (err, breads) => {
            res.render('admin-panel/details/breads', {active:'details', breads:breads, cats:cats});
        });
    });
}

exports.addBread = function(req, res) {
    let data = req.body.data;
    Breads.findOne({
        'category': data.category,
        'name': data.name
    }, function(err, bread) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (bread) {
            res.json({
                'status':'Duplicate',
                'msg' : 'Already Exist with Same Name!'
            });
        }
        if (!bread) {
            bread = new Breads({
                category: data.category,
                name: data.name,
                price: data.price
            });
            bread.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(bread._id);
                return;
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

exports.deleteBread = function(req, res) {
    let _id = req.body._id;
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    Breads.findOneAndRemove({_id: _id}, (err, bread) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}
