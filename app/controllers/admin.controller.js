var Product = require('mongoose').model('Product');
var Users = require('mongoose').model('User');
var Cats = require('mongoose').model('Category');

var sandCategory = "Sandwichs";

exports.render = function (req, res) {
    res.redirect('/admin-panel/users');
}

// users begin

exports.userList = function(req, res) {
    Users.find({}, function(err, users) {
        res.render('admin-panel/users', {users:users});
    });
}

exports.updateUser = function(req, res) {
    let email = req.body.email;
    let data = req.body.data;
    if (!email) {
        res.status(500).send('No Email');
        return;
    }
    Users.updateOne({email:email}, {$set:data}, (err, user) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}

exports.resetPassword = function(req, res) {
    let email = req.body.email;
    console.log('email', email);
    if (!email) {
        res.status(500).send('No Email');
        return;
    }
    Users.findOne({email:email}, (err, user) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        return user;
    }).then((user) => {
        user.setPassword('123456', function(err, newUser) {
            newUser.save();
        });
        res.send("Success");
    });
}

// end users

// category begin

exports.categoryList = function(req, res) {
    Cats.find({}, function(err, cats) {
        res.render('admin-panel/categories', {cats:cats});
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
            });
        }
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
