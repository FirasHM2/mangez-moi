var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    findOrCreate = require("mongoose-findorcreate");

var SauceSchema = new Schema({
    id: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        index: true
    },
    price: Number,
    available : {
        type : String,
        default : false
    }
});

SauceSchema.pre('save', function(next) {
    this.id = new mongoose.Types.ObjectId().toHexString();
    next();
});

SauceSchema.plugin(findOrCreate);

var Sauce = mongoose.model("Sauce", SauceSchema);
module.exports = Sauce;