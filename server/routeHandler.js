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
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var config = require('config');
mongoose.connect(config.get('mongo'));

routeHandler.use(cookieParser());
routeHandler.use(bodyParser.json());
routeHandler.use(cors());

var sessionStore = new MongoStore({mongooseConnection: mongoose.connection});
var sessionOpts = {
  saveUninitialized: true, // saved new sessions
  resave: false, // do not automatically write to the session store
  store: sessionStore,
  secret: 'secret',
  cookie : { httpOnly: true, maxAge: 2419200000 } // configure when sessions expires
}

routeHandler.use(morgan('tiny'));

routeHandler.use(session({
  secret: 'secretttt',
  resave: false,
  saveUninitialized: true
}));

routeHandler.use(passport.initialize());
routeHandler.use(passport.session(sessionOpts));

routeHandler.use(express.static(__dirname + '/../client'));

routeHandler.post('/login', passport.authenticate('local-login'), function(req, res) {
  res.send(200, req.user);
});
routeHandler.post('/signup', mailController.sendConfirmationEmail);
routeHandler.use('/verify', mailController.verficationOfAccount);
routeHandler.post('/forgot', mailController.sendForgotPasswordEmail)
routeHandler.post('/reset', mailController.verifyResetCode);
routeHandler.post('/reset-password', mailController.resetPassword);

var webhook = webApiRouter.webhook;
routeHandler.post('/sms', webhook, webApiRouter.saveComment);

module.exports = routeHandler;