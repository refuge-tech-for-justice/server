var twilio = require('twilio');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
app.listen(port);
console.log('Server started! At http://localhost:' + port);


var ConsistentHashing = require('consistent-hashing');
var cons = new ConsistentHashing(["server_1", "server_2", "server_3"]);
var map_to_num = {};
var TWILIO_AUTH_TOKEN = 'dummy_auth'
map_to_num["server_1"] = '+16313749574';
map_to_num["server_2"] = '+16179016321';
map_to_num["server_3"] = 'dummy_number';

var nodes = {};
var nums = [
  '6179016321am',
  '6313749574ms',
  '11111111a',
  '1122121'
]; //some unique id based on number and id

var get_fwd_number = function(request, response) {
  var twiml = new twilio.TwimlResponse();
  var sender = request.body['From'];
  var msg = request.body['Body'];
  var key = sender+msg
  var server = cons.getNode(key);
  console.log(map_to_num[server])
  send_msg(map_to_num[server], msg)
  response.send(twiml.message('HEY'));
}