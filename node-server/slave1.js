var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var firebase = require('firebase');
var _ = require('lodash');
var config = require('../node-server/helpers/config');
var command = require('./command.js');

var sms = function(request, response) {
  console.log("IN: ", _.pick(request.body, ['From', 'Body']));

  command(request, response);
};


var app = express();
var port = 8071;

app.post('/sms', twilio.webhook(config.TWILIO_AUTH_TOKEN), sms);
app.listen(port);

console.log('Server started! At http://localhost:' + port);
