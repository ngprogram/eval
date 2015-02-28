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

// routeHandler.post('/sms/', webhook, webApiRouter.saveComments);


routeHandler.use(session({
  secret: 'secretttt',
  resave: false,
  saveUninitialized: true
}));

routeHandler.use(passport.initialize());
routeHandler.use(passport.session());

routeHandler.use(express.static(__dirname + '/../client'));

routeHandler.use('/verify', mailController.verficationOfAccount, passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/'
}));
routeHandler.post('/login', passport.authenticate('local-login'), function(req, res) {
  res.send(200, req.user);
});
routeHandler.post('/signup', mailController.sendConfirmationEmail);
routeHandler.post('/forgot', mailController.sendForgotPasswordEmail)
routeHandler.post('/reset', mailController.verifyResetCode);
routeHandler.post('/reset-password', mailController.resetPassword);

// var webhook = webApiRouter.webhook;
// routeHandler.use('/api/', webhook, webApiRouter);
// routeHandler.use('/api/', webhook, webApiRouter);
// routeHandler.post('/sms', webhook, webApiRouter.saveComments);

module.exports = routeHandler;