var user = require('./dummy.js');

exports.render = function (req, res) {
    res.render("index", { user: user});
}