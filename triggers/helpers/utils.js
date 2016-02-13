var firebase = require('firebase');
var root = "https://refuge.firebaseio.com/";

var urls = {
    root : root,
    water : root + "water/",
    food : root + "food/",
    shelter : root + "shelter/",
    volunteers : root + "volunteers/",
    data : root+"data/"
};

var utils = {
    urls : urls,
};

module.exports=utils;