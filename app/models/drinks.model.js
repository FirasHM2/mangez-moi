var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    findOrCreate = require("mongoose-findorcreate");

var DrinkSchema = new Schema({
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

DrinkSchema.pre('save', function(next) {
    this.id = new mongoose.Types.ObjectId().toHexString();
    next();
});

DrinkSchema.plugin(findOrCreate);

var Drink = mongoose.model("Drink", DrinkSchema);
module.exports = Drink;