var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    findOrCreate = require("mongoose-findorcreate");

var IngreSchema = new Schema({
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

IngreSchema.plugin(findOrCreate);

var Ingredient = mongoose.model("Ingredient", IngreSchema);
module.exports = Ingredient;