module.exports = function (req, res, next) {
    if (req.user && req.user.role && req.user.role === 'admin') {
        return next();
    }
    res.redirect('/');
}