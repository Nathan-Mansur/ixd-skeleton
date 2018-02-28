/*
 * Add task
 */

var data = require("../tasks.json");

exports.addTask = function(req, res){

    var newTask = {
        'name': req.query.name,
        'time': req.query.time
    }

    data.tasks.push(newTask);
    res.render('home', {
        'tasks': data.tasks
    });
};