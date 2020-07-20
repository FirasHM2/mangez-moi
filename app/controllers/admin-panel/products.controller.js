var Products = require('mongoose').model('Product');

exports.productList = function(req, res) {
    Products.find({}, function(err, products) {
        res.render('admin-panel/menu/products', {active:'menu', products:products});
    });
// }
// exports.addCategory = function(req, res) {
//     let data = req.body.data;

//     Products.findOne({
//         'name': data.name
//     }, function(err, cat) {
//         if (err) {
//             res.status(500).send(err);
//             return;
//         }
//         if (!cat) {
//             cat = new Products({
//                 name: data.name,
//                 detail: data.detail
//             });
//             cat.save(function(err) {
//                 if (err) {
//                     res.status(500).send(err);
//                     return;
//                 }
//                 res.send(cat._id);
//                 return;
//             });
//         } else res.send("already_exist");
//     });
// }

// exports.updateCategory = function(req, res) {
//     let _id = req.body._id;
//     let data = req.body.data;
//     if (!_id) {
//         res.status(500).send('No Selected');
//         return;
//     }
//     Products.updateOne({_id: _id}, {$set:data}, (err, cat) => {
//         if (err) {
//             res.status(501).send(err);
//             return;
//         }
//         res.send("Success");
//     });
// }
// exports.deleteCategory = function(req, res) {
//     let _id = req.body._id;
//     console.log("_id: ", _id);
//     if (!_id) {
//         res.status(500).send('No Selected');
//         return;
//     }
//     Products.findOneAndRemove({_id: _id}, (err, cat) => {
//         if (err) {
//             res.status(501).send(err);
//             return;
//         }
//         res.send("Success");
//     });
}