var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    findOrCreate = require("mongoose-findorcreate");

var BreadSchema = new Schema({
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

BreadSchema.pre('save', function(next) {
    this.id = new mongoose.Types.ObjectId().toHexString();
    next();
});

BreadSchema.plugin(findOrCreate);

var Bread = mongoose.model("Bread", BreadSchema);
module.exports = Bread;