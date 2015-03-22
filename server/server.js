var express = require('express');
var routeHandler = require('./routeHandler');
var app = express();
var mongoose = require('mongoose');
var config = require('config');
mongoose.connect(config.get('mongo'));

app.use(routeHandler).listen(config.get('port'));
