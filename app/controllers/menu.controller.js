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
        console.log('cats', cats);
        console.log('constants', Constants);
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
            console.log('step collection', step.collection);
            console.log('contains category ', step.collection in ["Bread", "Meat"]);
            if (["Bread", "Meat"].includes(step.collection)) cond = {category:cid};
            return model.find(cond, (err, items) => {
                step.items = items;
                data.steps.push(step);
            });
        });
        Promise.all(tasks).then(() => {
            console.log('data', data);
            res.render('sandwichDetailsPopup', {data, Constants});
        });
    })
}

exports.getOrderPrice = (req, res) => {
    this._getOrderPrice(req, res, (req, res) => {
        res.json(req.totalPrice);
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

exports.getCartedCount = (req, res) => {
    Orders.find({'customer.email': req.user.email}, (err, orders) => {
        res.json(orders);
    });
};

exports._getOrderPrice = (req, res, next) => {
    let order = req.body;
    let totalPrice = 0;
    Products.findOne({id:order.product}).then((product) => {totalPrice += product.price;})
    .then(() => {
        let tasks = [];
        order.details.forEach((stepDetail) => {
            let type = stepDetail.type;
            let collection = stepDetail.collection;
            console.log('collection', collection);
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
                console.log('step total added');
            }));
        });
        Promise.all(tasks).then(() => {
            totalPrice *= order.count;
            console.log('total price', totalPrice);
            req.totalPrice = totalPrice;
            next(req, res);
        });
    });
}