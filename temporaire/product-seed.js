const Product = require("../models/products");

const products = [
   new Product({
                imagePath: "images/img-01.jpg",
                title: "Kebab",
                description: "Kebab maison yummy",
                type: "Sandwichs",
                price: 5.90
            }),
            new Product({
                         imagePath: "images/img-01.jpg",
                         title: "Hummer",
                         description: "Kebab maison yummy",
                         type: "Hummers",
                         price: 5.90
                     }),
                     new Product({
                                  imagePath: "images/img-01.jpg",
                                  title: "Amaricain",
                                  description: "Kebab maison yummy",
                                  type: "Americaines",
                                  price: 5.90
                              }),
            new Product({
                         imagePath: "images/img-01.jpg",
                         title: "Burger",
                         description: "burger maison yummy",
                         type: "Burgers",
                         price: 5.90
                     }),
                     new Product({
                                  imagePath: "images/img-01.jpg",
                                  title: "Vegetarien",
                                  description: "vegetarien maison yummy",
                                  type: "Vegetariens",
                                  price: 5.90
                              }),
                              new Product({
                                           imagePath: "images/img-01.jpg",
                                           title: "Panini",
                                           description: "panini maison yummy",
                                           type: "Paninis",
                                           price: 5.90
                                       }),
                                       new Product({
                                                    imagePath: "images/img-01.jpg",
                                                    title: "Panini 2",
                                                    description: "panini 2 maison yummy",
                                                    type: "Paninis",
                                                    price: 5.90
                                                }),
                                                new Product({
                                                             imagePath: "images/img-01.jpg",
                                                             title: "Tacos",
                                                             description: "tacos maison yummy",
                                                             type: "Tacos",
                                                             price: 5.90
                                                         })
                   ];

module.exports = products;
