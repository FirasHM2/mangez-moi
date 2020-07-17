var Users = require('mongoose').model('User');

exports.render = function (req, res) {
    res.redirect('/admin-panel/users');
}

exports.userList = function(req, res) {
    Users.find({}, function(err, users) {
        res.render('admin-panel/users', {active:'users', users:users});
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
