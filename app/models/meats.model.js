var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    findOrCreate = require("mongoose-findorcreate");

var MeatSchema = new Schema({
    category : String,
    id : String,
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

MeatSchema.pre('save', function(next) {
    this.id = new mongoose.Types.ObjectId().toHexString();
    next();
});

MeatSchema.plugin(findOrCreate);

var Meat = mongoose.model("Meat", MeatSchema);
module.exports = Meat;