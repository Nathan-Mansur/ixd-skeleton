/*
 * GET challenge page.
 */

var data = require("../challenge.json");

exports.view = function(req, res){
  res.render('challenge', {
  	'challenge': data.challenge
  });
};