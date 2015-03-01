var express = require('express');
var routeHandler = require('./routeHandler');
var app = express();
var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('mongo'));

var port = 8000;

// if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
//   port = 80;
// }

console.log('Server listening on ' + port);

app.use(routeHandler).listen(port);

module.exports = app;