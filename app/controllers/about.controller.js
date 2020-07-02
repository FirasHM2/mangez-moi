var user = require('./dummy.js');

exports.render = function (req, res) {
    res.render("about", { user: user});   
}