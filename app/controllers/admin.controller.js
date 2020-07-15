var Product = require('mongoose').model('Product');
var Users = require('mongoose').model('User');
var Cats = require('mongoose').model('Category');
var Ingredients = require('mongoose').model('Ingredient');
var Breads = require('mongoose').model('Bread');

exports.render = function (req, res) {
    res.redirect('/admin-panel/users');
}

// users begin

exports.userList = function(req, res) {
    Users.find({}, function(err, users) {
        res.render('admin-panel/users', {active:'users', users:users});
    });
}

exports.updateUser = function(req, res) {
    let email = req.body.email;
    let data = req.body.data;
    if (!email) {
        res.status(500).send('No Email');
        return;
    }
    Users.updateOne({email:email}, {$set:data}, (err, user) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}

exports.resetPassword = function(req, res) {
    let email = req.body.email;
    console.log('email', email);
    if (!email) {
        res.status(500).send('No Email');
        return;
    }
    Users.findOne({email:email}, (err, user) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        return user;
    }).then((user) => {
        user.setPassword('123456', function(err, newUser) {
            newUser.save();
        });
        res.send("Success");
    });
}

// end users

// category begin

exports.categoryList = function(req, res) {
    Cats.find({}, function(err, cats) {
        res.render('admin-panel/categories', {active:'menu', cats:cats});
    });
}
exports.addCategory = function(req, res) {
    let data = req.body.data;

    Cats.findOne({
        'name': data.name
    }, function(err, cat) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!cat) {
            cat = new Cats({
                name: data.name,
                detail: data.detail
            });
            cat.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(cat._id);
                return;
            });
        } else res.send("already_exist");
    });
}

exports.updateCategory = function(req, res) {
    let _id = req.body._id;
    let data = req.body.data;
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    Cats.updateOne({_id: _id}, {$set:data}, (err, cat) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}
exports.deleteCategory = function(req, res) {
    let _id = req.body._id;
    console.log("_id: ", _id);
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    Cats.findOneAndRemove({_id: _id}, (err, cat) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}


// type of bread
exports.breadsList = function(req, res) {
    Cats.find({}, (err, cats) => cats
    ).then((cats) => {
        Breads.find({}, (err, breads) => {
            res.render('admin-panel/breads', {active:'details', breads:breads, cats:cats});
        });
    });
}

exports.addBread = function(req, res) {
    let data = req.body.data;

    Breads.findOne({
        'name': data.name
    }, function(err, cat) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!cat) {
            bread = new Breads({
                category: data.categoryId,
                name: data.name,
                price: data.price
            });
            bread.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(bread._id);
            });
        }
    });
}

exports.updateBread = function(req, res) {
    let _id = req.body._id;
    let data = req.body.data;
    if (!_id) {
        res.status(500).send('No Selected');
        return;
    }
    Breads.updateOne({_id: _id}, {$set:data}, (err) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}

exports.ingredientsList = function(req, res) {
    Ingredients.find({}, (err, ingredients) => {
        res.render('admin-panel/ingredients', {active:'details', ingredients:ingredients});
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