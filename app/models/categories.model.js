var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    findOrCreate = require("mongoose-findorcreate");

var CategorySchema = new Schema({
    id: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        index: true
    },
    detail: String,
    available : {
        type : String,
        default : false
    }
});

CategorySchema.pre('save', function(next) {
    this.id = new mongoose.Types.ObjectId().toHexString();
    next();
});

CategorySchema.plugin(findOrCreate);

var Category = mongoose.model("Category", CategorySchema);
module.exports = Category;