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
                         title: "hummer",
                         description: "Kebab maison yummy",
                         type: "hummer",
                         price: 5.90
                     }),
                     new Product({
                                  imagePath: "images/img-01.jpg",
                                  title: "amaricaine",
                                  description: "Kebab maison yummy",
                                  type: "amaricaine",
                                  price: 5.90
                              }),
            new Product({
                         imagePath: "images/img-01.jpg",
                         title: "burger",
                         description: "burger maison yummy",
                         type: "burger",
                         price: 5.90
                     }),
                     new Product({
                                  imagePath: "images/img-01.jpg",
                                  title: "vegetarien",
                                  description: "vegetarien maison yummy",
                                  type: "vegetarien",
                                  price: 5.90
                              }),
                              new Product({
                                           imagePath: "images/img-01.jpg",
                                           title: "panini",
                                           description: "panini maison yummy",
                                           type: "panini",
                                           price: 5.90
                                       }),
                                       new Product({
                                                    imagePath: "images/img-01.jpg",
                                                    title: "panini 2",
                                                    description: "panini 2 maison yummy",
                                                    type: "panini",
                                                    price: 5.90
                                                })
                   ];

module.exports = products;
