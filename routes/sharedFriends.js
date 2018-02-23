
/*
 * GET sharedFriends page.
 */

var data = require("../sharedFriends.json")

exports.view = function(req, res){
  res.render('addFriend', {
  	'sharedFriends': data.sharedFriends
  });
};
