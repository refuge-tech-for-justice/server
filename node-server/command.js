var firebase = require('firebase');
var urls = require('./helpers/utils').urls;
var twilio = require('twilio');
var _ = require('lodash');
var get_area=require('./area_codes');

var store_request = function(url, sender, loc){
    var ref = new firebase(url);
    ref.push().set({
        sender:sender,
        loc: loc,
        time: firebase.ServerValue.TIMESTAMP
    });
}

var command = function(request, response, sender){
    console.log("IN: ", _.pick(request.body, ['From', 'Body']));

    var twiml = new twilio.TwimlResponse();
    // var sender = request.body['Sender'];
    var msg = request.body['Body'];

    if(msg.match(/FOOD/i)){
        store_request(urls.food, sender, get_area(sender));
    }
    if(msg.match(/water/i)){
        store_request(urls.water, sender, get_area(sender));
    }
    if(msg.match(/shelter/i)){
        store_request(urls.shelter, sender, get_area(sender));
    }

}

// console.log(get_area("+3022218413489"));
module.exports=command;