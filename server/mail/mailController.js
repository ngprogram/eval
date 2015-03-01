var mailCreator = require('./mailCreator');
var User = require('../user/userModel');
var TempUser = require('../user/tempUserModel');
var config = require('config');
var sendGridInfo = config.get('mail');
var sendgrid  = require('sendgrid')(sendGridInfo.api_user, sendGridInfo.api_key);
var _ = require('lodash');

var mailController = {};

mailController.sendConfirmationEmail = sendConfirmationEmail;
mailController.verficationOfAccount = verficationOfAccount;
mailController.sendForgotPasswordEmail = sendForgotPasswordEmail;
mailController.verifyResetCode = verifyResetCode;
mailController.resetPassword = resetPassword;

function sendConfirmationEmail(req, res, next) {
    console.log('sending');
    console.log(req.body);

    var tempAccount = req.body;
    var email = tempAccount.email;
    var rand = Math.floor((Math.random() * 1000000000000))
    var host=req.get('host');
    tempAccount.rand = rand;
    TempUser.create(tempAccount, function(err, createdAccount) {
        if (err) {
            console.log('error', err);
            res.sendStatus(401);
        }
        if (!err) {
            console.log('created account');
            var link="http://"+req.get('host')+"/verify?id="+rand;
            sendgrid.send(mailCreator.createVerificationEmail(email, link), function(err, json) {
                if (err) {
                    console.log('error', err);
                    res.sendStatus(401);
                } else {
                    res.send(200, rand);
                }
            });
        }
    });
};


function verficationOfAccount(req, res, next) {
    TempUser.findOne({rand: req.query.id}, function(err, foundTemp) {
        if(!err && foundTemp) {
            User.create(foundTemp, function(err, createdUser) {
                foundTemp.remove();
                req.user = createdUser;
                res.redirect('/#/dashboard');
            });


            // req.body.tempUser = foundTemp;
            // foundTemp.remove();
            // console.log('next');
            // console.log('next');
            // next();
        }
        else {
            console.log("email is not verified");
            res.redirect('/');
        }
    });
}

function sendForgotPasswordEmail(req, res, next) {
    var email = req.body.email;
    var rand = Math.floor((Math.random() * 1000000000000))
    host=req.get('host');

    var link="http://"+req.get('host')+"/reset/" + rand;
    User.findOne({email: email}, function(err, foundUser) {
        var forgotEmailObj = {
            isValid: false
        };
        if (err || !foundUser) {
            res.send(forgotEmailObj);
        }
        if (foundUser) {
            var forgotAccount = {
                rand: rand,
                email: email
            };
            TempUser.create(forgotAccount, function(err, createdTempAccount) {
                var username = foundUser.username;

                sendgrid.send(mailCreator.createForgottenPasswordEmail(email, username, link), function(err, json) {
                    if (err) {
                        return console.error(err);
                    } else {
                        forgotEmailObj.isValid = true;
                        res.send(forgotEmailObj);
                    }
                });
            });
        }
    });
}

function verifyResetCode(req, res, next) {
    var resetObj = {
        isValid: false
    };

    TempUser.findOne({rand: req.body.resetId}, function(err, foundTempUser) {
        if (err) {
            console.log('error verifying reset code');
        }
        if (foundTempUser) {
           resetObj.isValid = true;
        }
        res.send(resetObj);
    });

}

function resetPassword(req, res, next) {
    var newPassword = req.body.password;

    TempUser.findOne({rand: req.body.resetId}, function(err, foundTempUser) {
        if (!err) {
            User.findOne({email: foundTempUser.email}, function(err, foundUser) {
                if (!err) {
                    console.log('foundUser', foundUser);
                    foundUser.password = newPassword;
                    foundUser.save(function(err) {
                        req.body.username = foundUser.username;
                        req.body.password = newPassword;
                        foundTempUser.remove();
                        next();
                    });
                }
                if (err) {
                    console.log('error resetting password');
                }
            });
        }
    });
}

module.exports = mailController;




