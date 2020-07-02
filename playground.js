var config = require('./config/dev.env'),
    mongoose = require("mongoose");

mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

var Product = require('./app/models/products.model');

const products = require("./temporaire/product-seed");

Product.find({}, function (err, foundProducts) {
    if (products.length > foundProducts.length) {
        for (var i = foundProducts.length; i < products.length; i++) {
            products[i].save();
        }
    }
})