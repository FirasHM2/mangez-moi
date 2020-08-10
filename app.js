var express = require('./config/express');
var mongoose = require('./config/mongoose');
const PORT = process.env.PORT || 3001

var db = mongoose();
var app = express();

app.listen(PORT);
module.exports = app;

console.log('Server running at http://localhost:3001/');
