var webApiRouter = {};
var CommController = require('../comment/commentController');
var Comment = require('../comment/commentModel');
var config = require('config');
var twilio = require('twilio');
var accountSid = config.get('twilio.accountSid');
var authToken = config.get('twilio.authToken');
var client = require('twilio')(accountSid, authToken);

var webhook = twilio.webhook(
{
  // validate:false,
    // Only validate requests in production
    validate: process.env.NODE_ENV === 'production',

    // Manually configure the host and protocol used for webhook config - this
    // is the URL our Twilio number will hit in production
    host:'http://geteval.cloudapp.net/sms',
    protocol:'http'
});

webApiRouter.webhook = webhook;

webApiRouter.postComment = function(req,res){
  console.log('asdf');
  Comment.create({
    commentId: 0,
    comment: 'works',
    employee_name: "bob"
  });
  var twiml = new twilio.TwimlResponse();
  twiml.message('Hello from node.js!');
  // Render the TwiML response as XML
  res.send(twiml);
};

var saveComments = function(callback) {
  client.sms.messages.get(function(err,data) {
    if (!err) {
      data.sms_messages.forEach(function(msg) {
        var cmt = msg.body;
        if (cmt.split(' ').length > 3) {
            if (typeof parseInt(cmt[0],10) === 'number' && typeof cmt[1] === 'string') {
              var sent = cmt.split(' ').slice(2).join(' ');
              var comm = new Comment({
                id: msg.sid,
                companyId: '' + cmt.split(' ')[0],
                employee_name: cmt.split(' ')[1],
                comment : sent,
                date : msg.dateCreated,
                phone_number: msg.from,
              });
              CommController.saveComment(comm, function(savedC) {
                console.log('saved',savedC);
              });
            }
          }
      });
    } else {
      console.log(err);
    }
  });
};

function saveComment(req, res) {
  console.log('sdf');
  console.log(req);
  console.log('res', res);
}


// webApiRouter.get('/comments', saveComment);
webApiRouter.saveComment = saveComment;
// webApiRouter.post('/twilioComm', webApiRouter.postComment);
module.exports = webApiRouter;

