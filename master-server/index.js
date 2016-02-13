var express = require('express');
var bodyParser = require('body-parser');
var twilio = require('twilio');
var firebase = require('firebase');
var _ = require('lodash');

var config = require('./helpers/config');
var handle_error = require('./helpers/error_handler');
var utils = require('./helpers/utils');

var urls = utils.urls;
var http = require('http');

var ConsistentHashing = require('consistent-hashing');
var cons = new ConsistentHashing(["server_1", "server_2", "server_3"]);
var map_to_num = {};
map_to_num["server_1"] = '+12179190876';
map_to_num["server_2"] = '+12179190876';
map_to_num["server_3"] = '+12179190876';

var get_fwd_number = function(request, response) {
  var sender = request.body['From'];
  var msg = request.body['Body'];
  var key = sender+msg
  var server = cons.getNode(key);
  send_msg(map_to_num[server], sender, msg)
}


var send_msg = function(to, from, msg) {
  var client = twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN);
  client.sendMessage({
    to: to,
    from: from,
    body: msg,
  }, function(err, responseData) {
    if (err) {
      console.log('Error sending: ', err);
    }
    console.log(responseData.to);
    console.log(responseData.body);
  });
};

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/sms', twilio.webhook(config.TWILIO_AUTH_TOKEN), get_fwd_number);
// var sms = require('./slave1');
// app.post('/sms', twilio.webhook(config.TWILIO_AUTH_TOKEN), sms);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Refuge listening at http://%s:%s', host, port);
});

