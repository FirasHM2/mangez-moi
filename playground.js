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



To my friend, Firashm.

I want to chat with you via skype. So if you agree, plz tell me your skypeID, or mail by using this file.
To use skype in freelancer is illegal. :)

Thats great Dinh, here is my skypeID: live:hajmabroukfiras
and my email hajmabroukfiras@gmail.com
