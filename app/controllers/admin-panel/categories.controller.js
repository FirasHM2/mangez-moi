var Cats = require('mongoose').model('Category');
let Constants = require('../../../config/constants');

exports.categoryList = function(req, res) {
    Cats.find({}, function(err, cats) {
        res.render('admin-panel/menu/categories', {Constants:Constants, active:'menu', cats:cats});
    });
}
exports.get = (req, res) => {
    let id = req.params.id;
    Cats.findOne({id:id}, (err, cat) => {
        res.json(cat);
    });
}

exports.addCategory = function(req, res) {
    let data = req.body.data;
    if (data.id) {
        req.body.id = data.id;
        exports.updateCategory(req, res);
        return;
    }
    Cats.findOne({
        'name': data.name
    }, function(err, cat) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (cat) {
            res.json({
                'status':'Duplicate category name',
                'msg' : 'Already Exist with Same Name!'
            });
        }
        if (!cat) {
            cat = new Cats({
                name: data.name,
                steps: data.steps
            });
            cat.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send({status:'Success', id:cat.id});
                return;
            });
        } else res.send("already_exist");
    });
}

exports.updateCategory = function(req, res) {
    let id = req.body.id;
    let data = req.body.data;
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
    Cats.updateOne({id: id}, {$set:data}, (err, cat) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send({status:"Success", id:id});
    });
}
exports.deleteCategory = function(req, res) {
    let id = req.body.id;
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
    Cats.findOneAndRemove({id: id}, (err, cat) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}