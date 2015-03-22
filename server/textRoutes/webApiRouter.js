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
    validate: process.env.NODE_ENV === 'production',
    host:'http://geteval.cloudapp.net/sms',
    protocol:'http'
});

function saveComment(req, res) {
  processRequest(req, function(data) {
    var cmt = data.Body;
    if (cmt.split(' ').length >= 3) {
        if (typeof parseInt(cmt[0],10) === 'number' && typeof cmt[1] === 'string') {
          var comm = createComment(data, cmt);
          CommController.saveComment(comm, function(err, savedC) {
            res.sendStatus(200);
          });
        }
      }
    });
  var twiml = new twilio.TwimlResponse();
  twiml.message(req);
}

function createComment(data, cmt) {
  var name = cmt.split(' ')[1];
  var companyId = cmt.split(' ')[0];
  var empName = name.substring(0,1).toUpperCase() + name.substring(1);
  var sent = cmt.split(' ').slice(2).join(' ');

  var comm = {
    id: data.SMSSid,
    companyId: companyId,
    employee_name: empName,
    comment : sent,
    date: new Date(),
    phone_number: data.From
  };

  return comm;
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

webApiRouter.webhook = webhook;
webApiRouter.saveComment = saveComment;

module.exports = webApiRouter;
