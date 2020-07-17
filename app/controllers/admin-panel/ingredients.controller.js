var Ingredients = require('mongoose').model('Ingredient');

exports.ingredientsList = function(req, res) {
    Ingredients.find({}, (err, ingredients) => {
        res.render('admin-panel/details/ingredients', {active:'details', ingredients:ingredients});
    });
}

exports.addIngredient = function(req, res) {
    let data = req.body.data;

    Ingredients.findOne({
        'name': data.name
    }, function(err, cat) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!cat) {
            ingredient = new Ingredients({
                name: data.name,
                price: data.price
            });
            ingredient.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(ingredient._id);
            });
        }
    });
}

exports.updateIngredient = function(req, res) {
    let _id = req.body._id;
    let data = req.body.data;
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    Ingredients.updateOne({_id: _id}, {$set:data}, (err) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}
