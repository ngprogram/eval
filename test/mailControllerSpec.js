var request      = require('supertest'),
    express      = require('express'),
    bodyParser   = require('body-parser'),
    mongoose     = require('mongoose'),
    TempUser = require('../server/user/tempUserModel'),
    mailController = require('../server/mail/mailController');

var config = require('config');
mongoose.connect(config.get('mongo'));

var app = express();
app.use(bodyParser.json());

app.post('/signup', mailController.sendConfirmationEmail, function(req, res) {
  res.send('success signup');
});

var agent;
describe('Mail Controller Spec Specs', function() {

  before(function(done) {
    TempUser.remove({}, function() {
      console.log('local database cleared');
      TempUser.find({}, function(err, found) {
        console.log('local');
        console.log('err', err);
        console.log(found);
        done();
      });
    });
  });

  describe('POST signup', function () {
    it('should send email', function(done) {
      request(app)
        .post('/signup')
        .send({username: 'test', business_name: "Starbucks", email: 'azai91@gmail.com', password: 'hackreactor'})
        .expect(200, done);
    });

    xit('should return error if attempting to signup with a used email', function(done) {
      request(app)
        .post('/signup')
        .send({username: 'test', business_name: 'Starbucks', email: 'kirby8u@hotmail.com', password: 'hackreactor'})
        .expect(500, done);
    });
  });

  before(function(done) {
    agent = request.agent(app);
    done();
  })

  xdescribe('POST login', function() {
    it('should login into a current user successfully', function(done) {
      agent
        .post('/login')
        .send({ username: 'test', password: 'hackreactor'})
        .expect(200, done);
    });


    it('should return error if attempting to login with incorrect password', function(done) {
      request(app)
        .post('/login')
        .send({ username: 'test', password: 'wrong'})
        .expect(401, done);
    });


  });

});