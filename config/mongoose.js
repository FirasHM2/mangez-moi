var config = require('./dev.env'),
    mongoose = require("mongoose");

module.exports = function() {
    var db = mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});

    require('../app/models/users.model');
    require('../app/models/products.model');

    return db;
}