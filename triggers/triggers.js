var firebase=require('firebase');
var urls = require('./helpers/utils').urls;
var _ = require('lodash');
var get_area = require('./area_codes');

var food_ref = new firebase(urls.food);
var water_ref= new firebase(urls.water);
var shelter_ref = new firebase(urls.shelter);
var volunteers_ref = new firebase(urls.volunteers);


var ping = function(type, ref){
    return function(childSnapshot) {
        var req = childSnapshot.val();
        req.type=type;
        var area = req.loc;
        if (area === "unrecognized"){ return; }
        volunteers_ref.once("value", function(volunteersSnapshot){
            var volunteers = volunteersSnapshot.val();
            var nearby = [];
            _.each(volunteers, function(v,k){
                if(get_area(k) === area){
                    nearby.push(k);
                }
            });
            _.each(nearby, function(volunteer){
                volunteers_ref.child(volunteer).child("reqs").push().set(req);
            });
            childSnapshot.ref().remove();
        });
    };
};

food_ref.on('child_added', ping('food', food_ref));
water_ref.on('child_added', ping('water', water_ref));
shelter_ref.on('child_added', ping('shelter_ref', shelter_ref));




