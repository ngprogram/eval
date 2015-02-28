var mongoose = require('mongoose');
var config = require('config');

mongoose.connect(config.get('mongo'));

describe('Code Friends', function () {

  require('./integrations');
  require('./models');
  require('./controllers');

});