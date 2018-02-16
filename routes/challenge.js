/*
 * GET challenge page.
 */

var data = require("../publicLists.json");

exports.view = function(req, res){
  res.render('challenge', {
  	'challenge': data.publicLists
  });
};