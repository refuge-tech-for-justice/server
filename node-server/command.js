var firebase = require('firebase');
var urls = require('./helpers/utils').urls;

var store_request = function(url, sender, loc){
    var ref = new firebase(url);
    ref.push().set({
        sender:sender,
        loc: loc,
        time: firebase.ServerValue.TIMESTAMP
    });
}

var command = function(request, response){
    var sender = request.body['From'];
    var msg = request.body['Body'];

    if(msg.match(/FOOD/i)){
        store_request(urls.food, sender, "location");
    }
    if(msg.match(/water/i)){
        store_request(urls.water, sender, "location");
    }
    if(msg.match(/shelter/i)){
        store_request(urls.food, sender, "location");
    }
    
    response.send(twiml.message('HEY')); 
}

module.exports=command;