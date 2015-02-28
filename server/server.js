var express = require('express');

var routeHandler = require('./routeHandler');
var webApiRouter = require('./textRoutes/webApiRouter');
var webhook = webApiRouter.webhook;

var app = express();

var port = process.env.PORT || 8000;
console.log('Server listening on ' + port);

app.use(routeHandler).listen(port);

module.exports = app;
