var config = require('./dev.env'),
    mongoose = require("mongoose");

module.exports = function() {
    var db = mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});
    mongoose.set('useCreateIndex', true);
    mongoose.set('debug', true);

    require('../app/models/users.model');
    require('../app/models/products.model');
    require('../app/models/categories.model');
    require('../app/models/breads.model');
    require('../app/models/ingredients.model');
    require('../app/models/sauces.model');
    require('../app/models/supplements.model');
    require('../app/models/desserts.model');
    require('../app/models/ingredients.model');
    require('../app/models/drinks.model');
    require('../app/models/orders.model');

    return db;
}