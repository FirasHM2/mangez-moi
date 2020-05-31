const mongoose = require("mongoose");

const itemSchema = {
  imagePath: {type:String, required:true},
  title: {type:String, required:true},
  description: {type:String, required:true},
  type: {type:String, required:true},
  price: {type:Number, required:true}
}

const Product = mongoose.model("Product", itemSchema);

module.exports = Product;
