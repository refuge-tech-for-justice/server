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
map_to_num["server_1"] = '8071';
map_to_num["server_2"] = '8071';
map_to_num["server_3"] = '8071';

var get_fwd_number = function(request, response) {
  var twiml = new twilio.TwimlResponse();
  var sender = request.body['From'];
  var msg = request.body['Body'];
  var key = sender+msg
  var server = cons.getNode(key);
  var options = {
    hostname: '127.0.0.1',
    port: map_to_num[server],
    path: '/sms',
    method: 'POST',
    headers: {
      'MessageLength': msg.length
    }
  };
  console.log('reached here')
  var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
  });
  console.log(msg)
  req.write(msg);
  req.send();
}

var app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('/sms', twilio.webhook(config.TWILIO_AUTH_TOKEN), get_fwd_number);

app.get('/', function(req, res) {
  res.send('Hello World!');
});

var server = app.listen(80, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Refuge listening at http://%s:%s', host, port);

});
