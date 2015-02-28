var express = require('express');
var http = require('http');
var routeHandler = require('./routeHandler');
var webApiRouter = require('./textRoutes/webApiRouter');
var webhook = webApiRouter.webhook;
var app = express();
app.set('port', process.env.PORT || 8000);

var server = http.createServer(app);
server.listen(app.use(routeHandler).get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});

// var port = process.env.PORT || 8000;
// console.log('Server listening on ' + port);

// app.use(routeHandler).listen(port);

module.exports = server;
