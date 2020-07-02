module.exports = function (app) {
    require('./users.routes')(app);
    require('./home.routes')(app);
};