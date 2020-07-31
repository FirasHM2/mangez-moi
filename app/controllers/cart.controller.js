let Products = require('mongoose').model('Product');
let Cats = require('mongoose').model('Category');
let Constants = require('../../config/constants');
let Orders = require('mongoose').model('Order');
let menu = require('./menu.controller');

exports.render = (req, res) => {
    Orders.aggregate([
    {
        $match : {
            'customer.email' : req.user.email,
            'status' : 'carted'
        }
    },
    {
        $lookup : {
            from : "products",
            localField : "product",
            foreignField : "id",
            as : "product"
        }
    },
    {
        $unwind: "$product"
    }], (err, orders) => {
        let nOrders = [];
        let tasks = orders.map(order => {
            let orderData = Object.assign({}, order);
            orderData.product = order.product.id;
            return menu._getOrderPrice(orderData).then(price => {
                order.price = price;
                nOrders.push(order);
            });
        });
        Promise.all(tasks).then(() => {
            res.render('cart', {'orders': nOrders});
        });
    });
};

exports.delete = (req, res) => {
    let id = req.body.id;
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
    Orders.findOneAndRemove({id: id}, (err, order) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}