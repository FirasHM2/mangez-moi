const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const products = require("./temporaire/product-seed");
const Product = require("./models/products");
// const type = require("./temporaire/menu-buttons");

mongoose.connect('mongodb://localhost/produitsMangez-moi', {useNewUrlParser: true});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));






Product.find({},function(err,foundProducts){
  if (products.length > foundProducts.length) {
    for (var i = foundProducts.length; i < products.length; i++) {
      products[i].save();
    }
  }
})

var sandCategory = "Sandwichs";
app.get("/", function(req, res){

Product.find({},function(err,result){
  res.render("index", {sandwich:result, sandCategory:sandCategory});
    })
});

app.post("/sandwich",function(req,res){
  sandCategory = req.body.categieDeSandwich;
  res.redirect("/#menu");
})




app.get("/:pageName", function(req, res){
  res.render(req.params.pageName);
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
