var Gallerys = require('mongoose').model('Gallery');
var Cats = require('mongoose').model('Category');

exports.gallerytList = function(req, res) {
        Gallerys.find({}, (err, gallerys) => {
            res.render('admin-panel/management/gallerys', {active:'manage', gallerys:gallerys});
        });
}

exports.render = function (req, res) {
    res.render('admin-panel/management/gallerys',{active:'manage', cats: [1, 2]});
}

exports.addGallery = function(req, res) {
    let data = req.body.data;
    Gallerys.findOne({
        'name': data.name
    }, function(err, gallery) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (!gallery) {
            gallery = new Gallerys({
                name: data.name,
                description:data.description,
                image: data.image,
            });
            gallery.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(gallery.id);
                return;
            });
        } else res.send("already_exist");
    });
}

exports.updateGallery = function(req, res) {
    let id = req.body.id;
    let data = req.body.data;
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
    Gallerys.updateOne({id: id}, {$set:data}, (err) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}

exports.deleteGallery = function(req, res) {
    console.log("delete");
    let id = req.body.id;
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
    Gallerys.findOneAndRemove({id: id}, (err, product) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}
