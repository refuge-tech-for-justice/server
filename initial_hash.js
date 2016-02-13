var ConsistentHashing = require('consistent-hashing');
var cons = new ConsistentHashing(["node1", "node2", "node3"]);

var nodes = {};
var nums = [
  '6179016321am',
  '6313749574ms',
  '11111111a',
  '1122121'
]; //some unique id based on number and id

nums.forEach(function(c) {
  var node = cons.getNode(c);

  if (nodes[node]) {
    nodes[node].push(c);
  } else {
    nodes[node] = [];
    nodes[node].push(c);
  }
});

console.log(nodes); //distributes and prints nodes
