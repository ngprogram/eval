var webApiRouter = {};
var CommController = require('../comment/commentController');
var Comment = require('../comment/commentModel');
var config = require('config');
var twilio = require('twilio');
var qs = require('querystring');
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

function getAllTexts(req,res) {
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
                phone_number: msg.from
              });
              console.log(comm);
            }
          }
      });
    } else {
      console.log(err);
    }
  });
}

function processRequest(req, callback) {
    var body = '';
    req.on('data', function (data) {
        body += data;
    });
    req.on('end', function () {
        callback(qs.parse(body));
    });
}

function saveComment(req, res) {
  processRequest(req, function(data) {
    var cmt = data.Body;
    if (cmt.split(' ').length > 3) {
        if (typeof parseInt(cmt[0],10) === 'number' && typeof cmt[1] === 'string') {
          var sent = cmt.split(' ').slice(2).join(' ');
          var comm = new Comment({
            id: data.SMSSid,
            companyId: '' + cmt.split(' ')[0],
            employee_name: cmt.split(' ')[1],
            comment : sent,
            phone_number: data.From
          });
          console.log(comm);
          CommController.saveComment(comm, function(savedC) {
            console.log('saved',savedC);
          });
        }
      }
  console.log('dd',data);
    });
  var twiml = new twilio.TwimlResponse();
  twiml.message(req);
}

webApiRouter.webhook = webhook;
webApiRouter.saveComment = saveComment;
webApiRouter.getAllTexts = getAllTexts;

module.exports = webApiRouter;
