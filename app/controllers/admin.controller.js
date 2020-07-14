var Product = require('mongoose').model('Product');
var Users = require('mongoose').model('User');

var sandCategory = "Sandwichs";

exports.render = function (req, res) {
    res.redirect('/admin-panel/users');
}

exports.users = function(req, res) {
    Users.find({}, function(err, users) {
        res.render('admin-panel/users', {users:users});
    });
}

exports.update = function(req, res) {
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

exports.reset = function(req, res) {
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
