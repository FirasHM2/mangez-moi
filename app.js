const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const products = require("./temporaire/product-seed");
const Product = require("./models/products");

mongoose.connect('mongodb://localhost/produitsMangez-moi', {useNewUrlParser: true});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


for (var i = 0; i < products.length; i++) {
  products[i].save();
}

app.get("/", function(req, res){

  Product.find({}, function(err, foundProducts){
    res.render("index", {
      products: foundProducts
      });
  });
  })

app.get("/:pageName", function(req, res){
  res.render(req.params.pageName);
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
