var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    findOrCreate = require("mongoose-findorcreate");

var BreadSchema = new Schema({
    category : String,
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

BreadSchema.plugin(findOrCreate);

var Bread = mongoose.model("Bread", BreadSchema);
module.exports = Bread;