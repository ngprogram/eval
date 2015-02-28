var express = require('express');
var routeHandler = express.Router();
var path = require('path');

var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');

var webApiRouter = require('./textRoutes/webApiRouter');
var passport = require('./auth/passport');
var mailController = require('./mail/mailController');

routeHandler.use(session({
  secret: 'secretttt',
   resave: false,
   saveUninitialized: true
   }));
routeHandler.use(bodyParser.json());
routeHandler.use(cookieParser('secret'));
routeHandler.use(cors());
routeHandler.use(morgan('tiny'));

routeHandler.get('/', function(req, res) {
  console.log(__dirname);
  res.sendFile(path.resolve(__dirname + '/../client'));
});

routeHandler.use('/api/messages', webApiRouter);
routeHandler.post('/verify', passport.authenticate('local-signup'));
routeHandler.post('/login', passport.authenticate('local-login'));
routeHandler.post('/signup', mailController.sendConfirmationEmail);
routeHandler.post('/forgot', mailController.sendForgotPasswordEmail)
routeHandler.post('/reset', mailController.verifyResetCode);
routeHandler.post('/reset-password', mailController.resetPassword);


module.exports = routeHandler;