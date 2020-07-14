var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    findOrCreate = require("mongoose-findorcreate");

var CategorySchema = new Schema({
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

CategorySchema.plugin(findOrCreate);

var Category = mongoose.model("Category", CategorySchema);
module.exports = Category;