/*
 * Add task
 */

var data = require("../tasks.json");

exports.addTask = function(req, res){

    var newTask = {
        'name': req.query.name
    }

    data.tasks.push(newTask);
    res.render('tasks', {
        'tasks': data.tasks
    });
};