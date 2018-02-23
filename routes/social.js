/*
 * GET social page.
 */

var data = require("../publicLists.json");

exports.view = function(req, res){
  res.render('social', {
  	'publicLists': data.publicLists
  });
};