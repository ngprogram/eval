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
  res.sendFile(path.resolve(__dirname + '../../client'));
  console.log('adsf', __dirname + '../../client');

  // res.sendFile(path.resolve(__dirname + '/../client'));
});

routeHandler.post('/verify', passport.authenticate('local-signup'));
routeHandler.post('/login', passport.authenticate('local-login'));
routeHandler.post('/signup', mailController.sendConfirmationEmail);
routeHandler.post('/forgot', mailController.sendForgotPasswordEmail)
routeHandler.post('/reset', mailController.verifyResetCode);
routeHandler.post('/reset-password', mailController.resetPassword);

var webhook = webApiRouter.webhook;

routeHandler.use('/api/', webhook, webApiRouter);
routeHandler.post('/sms', webhook, webApiRouter.saveComments);

module.exports = routeHandler;