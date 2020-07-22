const mongoose = require("mongoose"),
  Schema = mongoose.Schema,
  findOrCreate = require("mongoose-findorcreate");;

var itemSchema = new Schema({
  id : String,
  category : String,
  name: {
    type: String
  },
  price : Number,
  description: String,
  available : {
    type : String,
    default : false
  },
  image: {
    type: Buffer,
    contentType: String
  }
});

itemSchema.pre('save', function(next) {
  this.id = new mongoose.Types.ObjectId().toHexString();
  next();
});

itemSchema.plugin(findOrCreate);
const Product = mongoose.model("Product", itemSchema);

module.exports = Product;
