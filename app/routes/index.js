module.exports = function (app) {
    require('./users.routes')(app);
    require('./home.routes')(app);
    require('./contact.routes')(app);
    require('./about.routes')(app);
    require('./menu.routes')(app);
    require('./gallery.routes')(app);
};