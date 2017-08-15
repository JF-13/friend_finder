var friends = require('../data/friends');
var tempScore = 0;
var tempFriend;
var lowestScore;

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });
  app.post("/api/friends", function(req, res) {
    var bff;
    if (friends.length === 1) {
      lowestScore = arrayAdding(friends[0].scores);
    }
    for (var i = 0; i < (friends.length - 1); i++){
      var diff = comparingArr((friends[(friends.length-1)].scores), (friends[i].scores));
      var smaller = scoreComparing(diff);
      if (smaller === true) {
        bff = friends[i];
      }
    }
    friends.push(req.body);
    res.json(bff);
  });
};

function scoreComparing(diff) {
  var result = false;
  if (diff < lowestScore) {
    lowestScore = diff;
    result = true;
  }
  return result;
}

function arrayAdding(arr){
  var total = 0;
  for (var i = 0; i < arr.length; i++) {
    total += parseInt(arr[i]);
  }
  return total;
}

function comparingArr(arr1, arr2) {
  var difference = 0;
  for (var i = 0; i < arr1.length; i++) {
    difference += Math.abs(arr1[i] - arr2[i]);
  }
  return difference;
}
