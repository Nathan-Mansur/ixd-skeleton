
/*
 * add friend's email into sharedFriends list
 */

var data = require("../sharedFriends.json")

exports.add = function(req, res){

  var newFriend = {
  	"name": "Jane Doe",
  	"email": req.query.email
  }

  //add newFriend into list
  data.sharedFriends.push(newFriend);

  //Reload page
  res.render('sharedFriends', data);

};