var Slides = require('mongoose').model('Slide');

exports.slideList = function(req, res) {
    Slides.find({}, (err, slides) => {
        res.render('admin-panel/management/slides', {active:'manage',slides:slides});
     });
}

exports.addSlide = function(req, res) {
    let data = req.body.data;
            slide = new Slides({
                content:data.content,
                image: data.image,
            });
            slide.save(function(err) {
                if (err) {
                    res.status(500).send(err);
                    return;
                }
                res.send(slide.id);
                return;
            });
}

exports.deleteSlide = function(req, res) {
    console.log("delete");
    let id = req.body.id;
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
    Slides.findOneAndRemove({id: id}, (err, product) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}

exports.updateSlide = function(req, res) {
    let id = req.body.id;
    let data = req.body.data;
    if (!id) {
        res.status(500).send('No Selected');
        return;
    }
    Slides.updateOne({id: id}, {$set:data}, (err) => {
        if (err) {
            res.status(501).send(err);
            return;
        }
        res.send("Success");
    });
}