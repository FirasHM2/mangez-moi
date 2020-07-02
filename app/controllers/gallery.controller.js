var user = require('./dummy.js');

exports.render = function (req, res) {
    res.render("gallery", {user: user });   
}