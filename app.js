var express = require('./config/express');
var mongoose = require('./config/mongoose');

var db = mongoose();
var app = express();

app.listen(process.env.PORT);
module.exports = app;

console.log('Server running at http://localhost:3001/');
