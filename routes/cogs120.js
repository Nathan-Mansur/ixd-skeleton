/*
 * GET cogs 120 page.
 */

var data = require("../cogs120.json");

exports.view = function(req, res){
  res.render('cogs120', {
      'cogs120': data.cogs120
  });
  console.log(data);
};
