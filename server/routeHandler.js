var express = require('express');
var routeHandler = express.Router();
var path = require('path');
var webApiRouter = require('./textRoutes/webApiRouter');

routeHandler.get('/', function(req, res) {
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname + '/../client'));
});


routeHandler.use('/api/messages', webApiRouter);


module.exports = routeHandler;