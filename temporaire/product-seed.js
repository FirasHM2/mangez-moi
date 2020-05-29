const Product = require("../models/products");

const products = [
  new Product({
  imagePath: "images/img-01.jpg",
  title: "Kebab",
  description: "Kebab maison yummy",
  price: 5.90
}),
new Product({
imagePath: "images/img-02.jpg",
title: "mangez-moi",
description: "deux viande au choix",
price: 7.50
}),
new Product({
imagePath: "images/img-03.jpg",
title: "mimas",
description: "2 steack et une galette de pomme de terre",
price: 6.50
}),
new Product({
imagePath: "images/img-04.jpg",
title: "chicken curry",
description: "chicken curry",
price: 5.90
})
];
module.exports = products;
