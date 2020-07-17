var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    findOrCreate = require("mongoose-findorcreate");

var IngredientSchema = new Schema({
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

IngredientSchema.pre('save', function(next) {
    this.id = new mongoose.Types.ObjectId().toHexString();
    next();
});

IngredientSchema.plugin(findOrCreate);

var Ingredient = mongoose.model("Ingredient", IngredientSchema);
module.exports = Ingredient;