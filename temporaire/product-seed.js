const Product = require("../models/products");

const products = [
   new Product({
                imagePath: "images/img-01.jpg",
                title: "Kebab",
                description: "Kebab maison yummy",
                type: "sandwich",
                price: 5.90
            }),
            new Product({
                         imagePath: "images/img-01.jpg",
                         title: "burger",
                         description: "burger maison yummy",
                         type: "burger",
                         price: 5.90
                     })
                   ]
module.exports = products;
