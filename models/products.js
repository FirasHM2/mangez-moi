const mongoose = require("mongoose");

const productSchema = {
  imagePath: String,
  title: String,
  description: String,
  price: Number
};


const Product = mongoose.model("Product", productSchema);

module.exports = Product;
