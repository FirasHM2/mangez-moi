var Products = require('mongoose').model('Product');
let Cats = require('mongoose').model('Category');
let Constants = require('../../config/constants');
let Orders = require('mongoose').model('Order');

exports.render = (req, res) => {
    let data = [];
    Cats.aggregate([{
        $lookup : {
            from : "products",
            localField : "id",
            foreignField : "category",
            as : "products"
        }
    }], (err, cats) => {
        res.render('menuPage', {data : cats, Constants : Constants});
    });
}

exports.popupDetails = (req, res) => {
    let cid = req.params.cid;
    let pid = req.params.pid;
    Cats.findOne({id:cid}).then((cat) => {
        data = {};
        data.name = cat.name;
        data.steps = [];
        let tasks = cat.steps.map((step) => {
            let model = require('mongoose').model(step.collection);
            let cond = {};
            if (["Bread", "Meat"].includes(step.collection)) cond = {category:cid};
            return model.find(cond, (err, items) => {
                step.items = items;
                data.steps.push(step);
            });
        });
        Promise.all(tasks).then(() => {
            res.render('sandwichDetailsPopup', {data, Constants});
        });
    })
}

exports.getOrderPrice = (req, res) => {
    this._getOrderPrice(req.body).then(price => {
        res.json(price);
    });
}

exports.addOrder = (req, res) => {
    let order = new Orders(req.body);
    order.customer = req.user;
    order.save((err, obj) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.json(obj);
        }
    });
}

exports.getCarted = (req, res) => {
    Orders.aggregate([
    {
        $match : {
            'customer.email' : req.user.email
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
            return this._getOrderPrice(orderData).then(price => {
                order.price = price;
                nOrders.push(order);
            });
        });
        Promise.all(tasks).then(() => {
            res.render('topCart', {'orders': nOrders});
        });
    });
};

exports._getOrderPrice = (orderData) => {
    let order = orderData;
    let totalPrice = 0;
    return Products.findOne({id:order.product})
    .then((product) => {totalPrice += product.price;})
    .then(() => {
        let tasks = [];
        order.details.forEach((stepDetail) => {
            let type = stepDetail.type;
            let collection = stepDetail.collection;
            let model = require('mongoose').model(collection);
            let stepTotal = 0;
            let stepTasks = [];
            if (type == Constants.StepType.Count) {
                stepTasks = stepDetail.values ? stepDetail.values.map((item) => model.findOne({id:item.id}).then((result) => {
                    stepTotal += result.price * item.count;
                })) : [];
            } else {
                stepTasks = stepDetail.values ? stepDetail.values.map((item) => model.findOne({id:item}).then((result) => {
                    stepTotal += result.price;
                })) : [];
            }
            tasks.push(Promise.all(stepTasks).then(() => {
                totalPrice += stepTotal;
            }));
        });
        return Promise.all(tasks).then(() => totalPrice);
    });
}