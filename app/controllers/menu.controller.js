var Products = require('mongoose').model('Product');
let Cats = require('mongoose').model('Category');
let Constants = require('../../config/constants');

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
    // Cats.find({}).then((cats) => {
    //     var tasks = cats.map((cat) => {
    //         // console.log('cat', cat);
    //         var categoryData = cat;
    //         return Products.find({category : cat.id}, (err, products) => {
    //             categoryData.products = products;
    //             data.push(categoryData);
    //         });
    //     });
    //     Promise.all(tasks).then(() => {
    //         res.render('menuPage', {data : data});
    //     });
    // });
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
            return model.find({}, (err, items) => {
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